import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions, Keyboard, ActivityIndicator ,Alert, ScrollView} from 'react-native';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

export default  class Privacy extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <ScrollView>
      <View style={commonStyle.container}>
      <View style={[commonStyle.contentCenter,{backgroundColor:common.blackColor,flexDirection : 'row'}]}>
        <View style={{flex:0.5}}>
        <TouchableHighlight onPress={() => goBack()} underlayColor="transparent" style={[{width : 60,height : 50,marginTop :10},commonStyle.contentCenter]}>
          <Image
            style={{width : 21, height : 18}}
            source={images.Arrow_White_Left}
          />
        </TouchableHighlight>
        </View>
        <View style={[{flex:1, marginTop : 10}]}>
          <Text style={[commonStyle.fontSize_16,{color: common.whiteColor, fontFamily: 'ProximaNova-Bold'}]}>Privacy</Text>
        </View>
      </View>
        <View style={commonStyle.subContainer}>
          <Text>
          Effective August 28, 2017

At Axle Technologies, LLC (“AXLE”) we recognize that privacy is important. This Privacy Policy (the “Privacy Policy”) applies to the Service offered by AXLE or its subsidiaries or affiliated companies. By using and/or accessing the Service, You are agreeing to the terms of this Privacy Policy and the accompanying Terms & Conditions, which is hereby incorporated by reference (collectively, the “Agreement”). If You do not agree to any of the terms in the Agreement, You may not access or use the Service. Capitalized terms not defined in this Privacy Policy shall have the meaning set forth in our Terms & Conditions.

This Privacy Policy applies to all Users of the Service, including, but not limited to, Subscribers of the Service. If you have any questions about this Privacy Policy, please feel free to contact us through our website or email us at legal@axletrucking.com.

Information we collect and how we use it

In order to provide our full range of Services, we may collect the following types of information:

Information You provide– When You register to use the Service, whether as a regular User or a Subscriber, we ask You for personal information (including, but not limited to: your name, email address, phone number, and an account password). For Subscribers, we also request credit card or other payment account information, as well as Federal Tax ID #, which we maintain in encrypted form on secure servers.
From Your Activity – In an ongoing effort to improve the Service, we automatically collect certain information when Users visit the site, the platform, and the app. This information consists of IP addresses, browser type and language, referring and exit pages and URLs, date and time, amount of time spent on particular pages, what sections of the Services You visit, and similar information concerning Your use of the Service.
Cookies– When you access the Service, we send one or more cookies – a small file containing a string of characters – to Your computer that uniquely identifies Your We use cookies to improve the quality of our Service by storing user preferences and tracking user trends, such as how people navigate our websites. We may use session cookies (which expire once you close Your web browser) and persistent cookies (which stay on Your computer/device until You delete them). If You do not want us to place a cookie on Your hard drive, You may be able to turn that feature off on Your computer or mobile device. Please consult Your Internet browser’s documentation for information on how to do this and how to delete persistent cookies. However, if You decide not to accept cookies from us, the Service may not function properly.
Location Information (Carriers only): Use of the Services requires collection of commercial drivers’ precise location data. If You (as a Carrier or a driver employed by a Carrier) grant AXLE permission, via the AXLE app, to access location services through the permission system used by Your mobile operating system, we will collect the precise location of Your We may also derive Your approximate location from Your IP address or phone number. We may also receive information about Your location from third parties.
Photos: If You permit the Axle app to access the camera on Your device via the permission system used by Your mobile operating system, we will enable You to take and upload to the Axle app or websites photos of bills of ladings, freight and other matters directly related to the Services.
Transaction Information: We collect transaction details related to Your use of the Services, including the type of Service, the date and time you used the Service, payment amounts, distance traveled, and other related transaction details.
Call and SMS Data: Our Services facilitate communications between Users, including telephone calls or SMS messages. In connection with facilitating this service, we may receive call data, including the date and time of the call or SMS message, the parties’ phone numbers, and the content of the SMS message.
Log information– When You access Axle Technologies Services, our servers automatically record information that your browser sends whenever you visit a website. These server logs may include information such as Your web request, Internet Protocol address, browser type, browser language, the date and time of your request and one or more cookies that may uniquely identify Your When You interact with the Services, we collect server logs, which may include information like device IP address, access dates and times, app features or pages viewed, app crashes and other system activity, type of browser, and the third-party site or service you were using before interacting with the Services. Important Information About Platform Permissions Most mobile platforms (iOS, Android, etc.) have defined certain types of device data that apps cannot access without Your Your consent. These platforms have different permission systems for obtaining Your consent. The permissions requested by Axle include permission to collect Your location data for the purposes described above. This permission will enable Axle to collect Your location data, even when the app is not running in the foreground or background of Your device. You will not be able to use the Axle app if you do not permit location data collection. Please note that turning off the app may not result in disabling Axle’s ability to collect Your location data. If You initially permit the collection of this information, You can later disable it by changing the location settings on Your mobile device.
User communications– When You send email or other communications to Axle Technologies, we may retain those communications in order to process Your inquiries, respond to Your requests and improve our Services.
Affiliated sites– We offer some of our Services in connection with other web sites. Personal information that You provide to those sites may be sent to Axle Technologies in order to deliver the Service. We process such information in accordance with this Privacy Policy. The affiliated sites may have different privacy practices and we encourage You to read their privacy policies.
Links– Axle Technologies may present links in a format that enables us to track whether these links have been followed. We use this information to improve the quality of our customer relationship systems and customized content.
Other sites – This Privacy Policy applies to the AXLE Services only. We do not exercise control over the sites displayed as links from within our various Services.
In order to provide our full range of Services, we may collect the following types of information from other sources and combine that with information we collect through the Services:

For example: If You are a commercial driver, we may receive information about You from other Users such as Carriers or Subscribers, or from third parties. This includes information about Your location, or driver rating or similar ratings of the services that You provide for such Users through the Axle app.
If You are a commercial driver or Carrier, we might receive information about You from the Federal Motor Carrier Safety Administration, or other regulatory bodies involved in the regulation of carriers.
If You choose to link, create, or log in to your Axle app account with a payment provider (e.g., Google Wallet) or social media service (e.g., Facebook), or if You engage with a separate app or website that uses our API (or whose API we use), we may receive information about You or Your connections from that site or app.
Axle Technologies processes personal information for the purposes described in this Privacy Policy. In addition to the above, such purposes include but are not limited to:

Providing our Services to Users, including the display of customized content and advertising;
Auditing, research and analysis in order to maintain, protect and improve our Services;
Sending You marketing communications that we believe may be of interest to You in accordance with Your preferences;
Ensuring the technical functioning of our network;
Developing new Services;
Tracking the status and location of shipments transported through the Services; and
Sending or facilitating communications between You and other Users of the Services, such as estimated delivery arrival and delivery times.
We may process personal information to provide our own Services. In some cases, we may process personal information on behalf of and according to the instructions of a third party, such as our business partners.
Information sharing

AXLE only shares personal information with other companies or individuals outside of AXLE in the following limited circumstances:

If we have Your express We require opt-in consent for the sharing of any sensitive personal information.
We provide such information to our subsidiaries, affiliated companies or other trusted businesses or persons for the purpose of processing personal information on our behalf. We require that these parties agree to process such information based on our instructions and in compliance with this Privacy Policy and/or any other appropriate confidentiality and security measures.
We have a good faith belief that access, use, preservation or disclosure of such information is reasonably necessary to (a) satisfy any applicable law, regulation, legal process or enforceable governmental request, (b) enforce applicable Terms of Service, including investigation of potential violations thereof, (c) detect, prevent, or otherwise address fraud, security or technical issues, or (d) protect against imminent harm to the rights, property or safety of AXLE, its Users or the public as required or permitted by law.
With third parties with whom You choose to let us share information. For example, other applications or websites that integrate with our API or Services, or those with an API or Service with which we integrate.
We use one or more third-party analytics services to evaluate Your use of the Service, compile reports on activity (based on their collection of IP addresses, Internet service provider, browser type, operating system and language, referring and exit pages and URLs, data and time, amount of time spent on particular pages, what sections of the Service You use, number of links clicked while on the Service, search terms and other similar usage data), and analyze performance metrics. We also use one or more third-party remarketing services to advertise on third-party websites to previous visitors to our website, our applications and our platform.

These third-party analytics and remarketing service providers use cookies and other technologies to help analyze and provide us with data, and to serve ads based on a past visit to our website, applications or platform. Any data collected by such third parties will be used in accordance with this Privacy Policy and the privacy policy of such third parties. By accessing and using the Service, You consent to the processing of data about You by these analytics and remarketing service providers in the manner and for the purposes set out in this Privacy Policy. For more information on these third parties, including how to opt out from certain data collection, please visit the sites below. Please be advised that if You opt out of any service, you may not be able to use the full functionality of the Service.
For Hubspot, please visit: https://legal.hubspot.com/privacy-policy
Google Analytics, please visit: https://www.google.com/analytics
For Mailchimp, please visit: https://mailchimp.com/legal/privacy/
If Axle Technologies becomes involved in a merger, acquisition, or any form of sale of some or all of its assets, we will provide notice before personal information is transferred and becomes subject to a different privacy policy. We may share with third parties certain pieces of aggregated, non-personal (anonymized) information. This refers to information that is recorded about users and collected into groups so that it no longer reflects or references an individually identifiable user. Examples could include the number of Users who clicked on a particular advertisement or the number of Users submitting a particular freight matching search. Such information does not identify You individually.

Please contact us for any additional questions about the management or use of personal data.

Information security

We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of data. These include internal reviews of our data collection, storage and processing practices and security measures, as well as physical security measures to guard against unauthorized access to systems where we store personal data.

We restrict access to personal information to AXLE employees, contractors and agents who need to know that information in order to operate, develop or improve our Services. These individuals are bound by confidentiality obligations and may be subject to discipline, including termination and criminal prosecution, if they fail to meet these obligations.

Data integrity

AXLE processes personal information only for the purposes for which it was collected and in accordance with this Privacy Policy. We review our data collection, storage and processing practices to ensure that we only collect, store and process the personal information needed to provide or improve our Services. We take reasonable steps to ensure that the personal information we process is accurate, complete, and current, but we depend on our users to update or correct their personal information whenever necessary.

Accessing and updating personal information

When You use Axle Technologies Services, we make good faith efforts to provide You with access to your personal information and either to correct this data if it is inaccurate or to delete such data at your request if it is not otherwise required to be retained by law or for legitimate business purposes. We ask individual users to identify themselves and the information requested to be accessed, corrected or removed before processing such requests, and we may decline to process requests that are unreasonably repetitive or systematic, require disproportionate technical effort, jeopardize the privacy of others, or would be extremely impractical (for instance, requests concerning information residing on backup tapes), or for which access is not otherwise required. In any case where we provide information access and correction, we perform this Service free of charge, except if doing so would require a disproportionate effort. Some of our Services have different procedures to access, correct or delete users’ personal information.

Enforcement

AXLE regularly reviews its compliance with this Privacy Policy. Please feel free to direct any questions or concerns regarding this Privacy Policy or AXLE’s treatment of personal information by contacting us through this web site or by emailing us at legal@axletrucking.com

When we receive complaints, it is AXLE’s policy to contact the complaining user regarding his or her concerns. We will cooperate with the appropriate regulatory authorities, including local data protection authorities, to resolve any complaints regarding the transfer of personal data that cannot be resolved between AXLE and an individual.

Important Notices to Non-U.S. Residents

The Service and our servers are operated in the United States and elsewhere. Please be aware that Your personal information may be transferred to, processed, maintained, and used on computers, servers, and systems located outside of Your state, province, country, or other governmental jurisdiction where the privacy laws may not be as protective as those in Your jurisdiction. If You are located outside the United States and choose to use the Service, You hereby irrevocably and unconditionally consent to such transfer, processing, and use in the United States and elsewhere.

External Websites

The Service may contain links to third-party websites. AXLE has no control over the privacy practices or the content of these websites. As such, we are not responsible for the content or the privacy policies of those third-party websites. You should check the applicable third-party privacy policy and terms of use when visiting any other websites.

Children

The Service is not directed to children under the age of 13. AXLE adheres to the Children’s Online Privacy Protection Act (“COPPA”) and will not knowingly collect personal information from any child under the age of 13. We ask that minors (under the age of 13) not submit any personal information to us. If a child has submitted personal information to us, a parent or guardian of that child may contact us and request that such information be deleted from our records.

California Residents

Pursuant to Section 1798.83 of the California Civil Code, residents of California have the right to obtain certain information about the types of personal information that companies with whom they have an established business relationship (and that are not otherwise exempt) have shared with third parties for direct marketing purposes during the preceding calendar year, including the names and addresses of those third parties, and examples of the types of services or products marketed by those third parties. If You wish to submit a request pursuant to Section 1798.83, please contact AXLE via email at legal@axletrucking.com. AXLE does not monitor, recognize, or honor any opt-out or do not track mechanisms, including general web browser “Do Not Track” settings and/or signals.

Changes to this Privacy Policy

Please note that this Privacy Policy may change from time to time. We will not reduce Your right under this Privacy Policy without Your explicit consent. We will post any Privacy Policy changes on this page and, if the changes are significant, we will provide a more prominent notice (including, for certain Services, email notification of Privacy Policy changes). Each version of this Privacy Policy will be identified at the top of the page by its Effective Date, and we will also keep prior versions of this Privacy Policy in an archive for Your review.

If You have any additional questions or concerns about this Privacy Policy, please feel free to contact us any time through this web site or email us at legal@axletrucking.com.
          </Text>
        </View>


      </View>
      </ScrollView>
    )
  }
}
