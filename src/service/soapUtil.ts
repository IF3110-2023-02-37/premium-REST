import { createClientAsync } from "soap";
import axios, { AxiosResponse } from 'axios';



// const getSubsClient = async (podcaster : String) => {
//   const client = await createClientAsync(process.env.SOAP_URL);
//   const result = await client.getSubsAsync(
//     {
//       podcaster,
//     },
//     {
//       Headers: {
//         Authorization: `${process.env.SOAP_TOKEN}`,
//       }
//     }
//   );
//   printFormattedSOAPMessage(result);
//   return result;
// };


const getSubsClient = async (podcaster : String) => {
  try {
    let envelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint/">
    <soapenv:Header>
    <soapenv:Authorization>${process.env.SOAP_APIKEY}</soapenv:Authorization>
    </soapenv:Header>
   <soapenv:Body>
   	<end:getSubs>
   	<podcaster>${podcaster}</podcaster>
      </end:getSubs>
   </soapenv:Body>
  </soapenv:Envelope>`;
  
    const response = await axios.post(process.env.SOAP_URL, envelope, {
      headers: { 'Content-Type': 'text/xml' },
    });
    console.log("SOAP Response Data:");
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  
  }
}

const getPendingSubsClient = async (podcaster : String) => {
  try {
    let envelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint/">
    <soapenv:Header>
    <soapenv:Authorization>${process.env.SOAP_APIKEY}</soapenv:Authorization>
    </soapenv:Header>
   <soapenv:Body>
   	<end:getPendingSubs>
   	<podcaster>${podcaster}</podcaster>
      </end:getPendingSubs>
   </soapenv:Body>
  </soapenv:Envelope>`;
  
    const response = await axios.post(process.env.SOAP_URL, envelope, {
      headers: { 'Content-Type': 'text/xml' },
    });
    console.log("SOAP Response Data:");
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  
  }
}

const acceptSubsClient = async (podcaster : String, subscriber : String) => {
  try {
    let envelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint/">
    <soapenv:Header>
    <soapenv:Authorization>${process.env.SOAP_APIKEY}</soapenv:Authorization>
    </soapenv:Header>
   <soapenv:Body>
   	<end:acceptSubs>
   	<podcaster>${podcaster}</podcaster>
    <subscriber>${subscriber}</subscriber>
      </end:acceptSubs>
   </soapenv:Body>
  </soapenv:Envelope>`;
  
    const response = await axios.post(process.env.SOAP_URL, envelope, {
      headers: { 'Content-Type': 'text/xml' },
    });
    console.log("SOAP Response Data:");
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  
  }
}
const rejectSubsClient = async (podcaster : String, subscriber : String) => {
  try {
    let envelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint/">
    <soapenv:Header>
    <soapenv:Authorization>${process.env.SOAP_APIKEY}</soapenv:Authorization>
    </soapenv:Header>
   <soapenv:Body>
   	<end:acceptSubs>
   	<podcaster>${podcaster}</podcaster>
    <subscriber>${subscriber}</subscriber>
      </end:acceptSubs>
   </soapenv:Body>
  </soapenv:Envelope>`;
  
    const response = await axios.post(process.env.SOAP_URL, envelope, {
      headers: { 'Content-Type': 'text/xml' },
    });
    console.log("SOAP Response Data:");
    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  
  }
}


const printFormattedSOAPMessage = (soapMessage : any) => {
  // Convert the SOAP message to a string
  const soapMessageString = soapMessage.toString();

  // Print the formatted SOAP message
  console.log("Formatted SOAP Message:");
  console.log(soapMessageString);
};

export { getSubsClient, getPendingSubsClient, acceptSubsClient, rejectSubsClient }