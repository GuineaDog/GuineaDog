/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular dependencies are forbidden as they lead to spaghetti code and unpredictable behavior.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-orphans',
      comment: 'Files that are not imported by any other file (and are not entry points) might be dead code.',
      severity: 'error',
      from: {
        orphan: true,
        pathNot: [
          '\\.config\\.(js|mjs|ts|cjs)$',
          '^\\.dependency-cruiser\\.cjs$',
          '^eslint\\.config\\.mjs$',
          '\\.test\\.mjs$',
          'README\\.md$',
          '^packages/[^/]+/index\\.mjs$',
        ],
      },
      to: {},
    },
    {
      name: 'not-to-unlisted-dependency',
      comment: 'Dependencies should be explicitly listed in package.json.',
      severity: 'error',
      from: { path: '^packages' },
      to: {
        dependencyTypesNot: ['core', 'type-only', 'local', 'npm', 'npm-dev'],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      mainFields: ['module', 'main', 'types', 'typings'],
    },
  },
};
