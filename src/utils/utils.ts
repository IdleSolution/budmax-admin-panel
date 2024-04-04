export const snakeToCamel = (str: string) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

export const CoalTypeTranslations = {
    'cube': 'kostka',
    'walnut': 'orzech',
    'eco': 'groszek',
  }