import { t } from './i18n.js';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function optionalImport(packageName) {
  try {
    return await import(packageName);
  } catch (error) {
    if (error?.code === 'ERR_MODULE_NOT_FOUND' && error.message.includes(`'${packageName}'`)) {
      return null;
    }
    throw error;
  }
}

function normalizeAnswer(answer) {
  return answer.trim();
}

function parseSelection(answer, max) {
  const index = Number.parseInt(answer, 10);
  if (!Number.isInteger(index) || index < 1 || index > max) return null;
  return index - 1;
}

function formatChoiceLine(index, label, suffix = '') {
  return `  ${index}. ${label}${suffix}`;
}

function createFallbackPrompt() {
  let rl;

  function getInterface() {
    if (!rl) {
      rl = createInterface({ input, output });
    }
    return rl;
  }

  return {
    async ask(question) {
      return getInterface().question(`${question} `);
    },
    async choose(question, options) {
      output.write(`  ${question}\n`);
      options.forEach((option, index) => {
        output.write(`${formatChoiceLine(index + 1, option.label)}\n`);
      });

      while (true) {
        const answer = normalizeAnswer(await getInterface().question('  Enter a number: '));
        const selectedIndex = parseSelection(answer, options.length);

        if (selectedIndex !== null) {
          return options[selectedIndex];
        }

        output.write('  Invalid selection. Try again.\n');
      }
    },
    async multiChoose(question, options, { validate } = {}) {
      const selectableOptions = [];

      output.write(`  ${question}\n`);

      for (const option of options) {
        if (option.separator) {
          output.write(`  ${option.label}\n`);
          continue;
        }

        const suffixParts = [];
        if (option.checked) suffixParts.push('default');
        if (option.disabled) suffixParts.push(t('comingSoon'));

        const suffix = suffixParts.length > 0 ? ` (${suffixParts.join(', ')})` : '';
        if (!option.disabled) {
          const displayIndex = selectableOptions.length + 1;
          output.write(`${formatChoiceLine(displayIndex, option.label, suffix)}\n`);
          selectableOptions.push(option);
        } else {
          output.write(`  - ${option.label}${suffix}\n`);
        }
      }

      const defaultValues = selectableOptions
        .filter(option => option.checked)
        .map(option => option.value);

      while (true) {
        const answer = normalizeAnswer(
          await getInterface().question('  Enter numbers separated by commas (press Enter for defaults): ')
        );

        let selectedValues;
        if (!answer) {
          selectedValues = [...defaultValues];
        } else {
          const picks = answer
            .split(',')
            .map(part => normalizeAnswer(part))
            .filter(Boolean);

          const invalidPick = picks.find(pick => parseSelection(pick, selectableOptions.length) === null);
          if (invalidPick) {
            output.write('  Invalid selection. Try again.\n');
            continue;
          }

          selectedValues = [...new Set(
            picks.map(pick => selectableOptions[parseSelection(pick, selectableOptions.length)].value)
          )];
        }

        const result = validate
          ? await validate(selectedValues)
          : (selectedValues.length > 0 || t('atLeastOneIde'));

        if (result === true) {
          return selectedValues;
        }

        if (typeof result === 'string' && result.length > 0) {
          output.write(`  ${result}\n`);
          continue;
        }

        output.write('  Invalid selection. Try again.\n');
      }
    },
    close() {
      rl?.close();
      rl = null;
    },
  };
}

export function createPrompt() {
  const fallbackPrompt = createFallbackPrompt();

  return {
    async ask(question) {
      const promptModule = await optionalImport('@inquirer/input');
      if (!promptModule) return fallbackPrompt.ask(question);

      const { default: askInput } = promptModule;
      return askInput({ message: question });
    },
    async choose(question, options) {
      const promptModule = await optionalImport('@inquirer/select');
      if (!promptModule) return fallbackPrompt.choose(question, options);

      const { default: select } = promptModule;

      const choices = options.map(opt => ({
        name: opt.label,
        value: opt,
      }));

      return select({
        message: `  ${question}`,
        choices,
        loop: false,
      });
    },
    async multiChoose(question, options, { validate } = {}) {
      const promptModule = await optionalImport('@inquirer/checkbox');
      if (!promptModule) {
        return fallbackPrompt.multiChoose(question, options, { validate });
      }

      const { default: checkbox, Separator } = promptModule;

      const choices = options.map(opt => {
        if (opt.separator) return new Separator(opt.label);
        return {
          name: opt.label,
          value: opt.value,
          checked: opt.checked ?? false,
          disabled: opt.disabled ? t('comingSoon') : false,
        };
      });

      return checkbox({
        message: `  ${question}`,
        choices,
        loop: false,
        validate: validate ?? ((selected) =>
          selected.length > 0 || t('atLeastOneIde')),
      });
    },
    close() {
      fallbackPrompt.close();
    },
  };
}
