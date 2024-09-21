import { ApiSchema } from "../handler";

const constructPath = (apiSchema: ApiSchema) => {
  return `${apiSchema.method} ${apiSchema.path}`;
};

export const getAllPaths = (
  rootPath: string,
  contract: any,
  parentPath: string,
  bindedValuesArr: any[]
) => {
  const paths: { path: string; handler: string; link: any[]; timeout: string }[] = [];

  Object.entries(contract).forEach(([key, value]) => {
    const currentPath = `${parentPath}/${key}`;

    if ((value as any).method) {
      paths.push({
        handler: `${rootPath}${currentPath}.main`,
        link: [...bindedValuesArr],
        path: constructPath(value as ApiSchema),
      });
    } else {
      const recursivePaths = getAllPaths(rootPath, value, currentPath, bindedValuesArr);
      paths.push(...recursivePaths);
    }

    return paths;
  });

  return paths;
};
