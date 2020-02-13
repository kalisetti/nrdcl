import React from 'react';
import {
  Container, Header, Content, Accordion
} from 'native-base';
const dataArray = [
  { title: "What is ‘My Resources’?", content: "‘My Resources’ is the name given to the mobile application for the services provided by NRDCL. It allows customers to place order for sand requirements, including making payments and confirming delivery through a mobile device such as a phone or tablet." },
  { title: "What services can I avail through My Resources?", content: "If you are a customer, you can order your sand requirement through My Resources, make payment and acknowledge delivery.If you are a transporter, you can register your truck under “Common Pool” for transportation of sand from Wangdue to other Dzongkhags. You can manage your vehicles and deliveries." },
  { title: "What is ‘Common Pool” transport?", content: "NRDCL arranges transportation services for its customers for Sha Branch through a pool of trucks maintained with the company which is referred to as “Common Pool”." },
  { title: "Are there any charges for using My Resources?", content: "NRDCL will not charge the customers any fee for using My Resources." },
  { title: "How do I register on My Resources?", content: "You can download My Resources on Google Play Store for Android users or App Store for IOS/Apple users and register online through the app." },
  { title: "How do I log in to My Resources?", content: "You can log in using your registered CID number and the four-digit PIN provided to you through SMS upon registration." },
  { title: "How is payment processed in My Resources?", content: "The payment is processed through the Royal Monetary Authority (RMA) Payment Gateway, which is linked to all the banks within the country. You can select the bank and enter your account number to make the payment. You will receive a One Time Password (OTP) from your designated bank through SMS, which should be used to confirm your payment." },
  { title: "Are account details stored on my mobile device?", content: "No, your account details will not be stored in your mobile device for any payment/transaction made through My Resources." },
  { title: "Can I change my PIN in My Resources? What if I forget my PIN?", content: "You can reset your PIN at any time by clicking on ‘Reset PIN’ in the log in page. You will receive SMS with your new PIN." },
  { title: "Can I use My Resources outside Bhutan?", content: "Yes, you can use it from anywhere if you are already registered. However, SMS notifications will be sent only to your registered local Bhutanese mobile number." },
  { title: "What happens if I change my mobile model, number or mobile service provider?", content: "If you change your mobile device, you can download My Resources and login using your existing registered CID and PIN. If you change your mobile number or service provider, you can update and register the new number at the nearest NRDCL Office. " },
  { title: "How do I report a problem with My Resources?", content: "You can call 02-323868 or visit the nearest NRDCL Office." }
];
export const Faq = () => {
  return (
    <Container>
      <Content padder>
        <Accordion dataArray={dataArray} expanded={0}
          headerStyle={{
            borderWidth: 0.5,
            fontcolor: "#12793e",
            borderColor: "gray",
          }}
          contentStyle={{ backgroundColor: "#d3d3d3" }}
        />
      </Content>
    </Container>
  );
};
export default Faq;
