// export const connectionsMap = new Map<string, string>();

export const connectionsMap: Record<string, string> = {};

export const getUsername = (socketId: string) => {
  return Object.keys(connectionsMap).find(
    (key) => connectionsMap[key] === socketId
  );
};
