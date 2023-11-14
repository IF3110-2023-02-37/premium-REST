import { createClientAsync } from "soap";



const getSubsClient = async (podcaster : String) => {
  const client = await createClientAsync(process.env.SOAP_URL);
  const result = await client.getSubsAsync(
    {},
    {
      Headers: {
        Authorization: `${process.env.SOAP_TOKEN}`,
      }
    }
  );
  printFormattedSOAPMessage(result);
  return result;
}

const printFormattedSOAPMessage = (soapMessage : any) => {
  // Convert the SOAP message to a string
  const soapMessageString = soapMessage.toString();

  // Print the formatted SOAP message
  console.log("Formatted SOAP Message:");
  console.log(soapMessageString);
};

export { getSubsClient }