import * as mcs from "node-mcstatus";

export async function getServerStatus(
  serverAddress: string,
  gameEdition: string,
) {
  const serverStatus =
    gameEdition == "java"
      ? await mcs.statusJava(serverAddress)
      : await mcs.statusBedrock(serverAddress);

  if (!serverStatus) {
    throw new Error("Invalid server response");
  }

  return serverStatus;
}
