import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, Dimensions, Keyboard, ActivityIndicator ,Alert, ScrollView} from 'react-native';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

export default  class Terms extends Component {
  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <ScrollView syle={{marginBottom:20}}>
      <View style={[commonStyle.container]}>
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
          <Text style={[commonStyle.fontSize_16,{color: common.whiteColor, fontFamily: 'ProximaNova-Bold'}]}>Terms and Condition</Text>
        </View>
      </View>
        <View style={{flex:1, paddingHorizontal:6, marginTop:10}}>
            <Text style={{fontSize: 15, fontFamily: 'ProximaNova-Bold'}}>
              AXLE® TECHNOLOGIES, LLC TERMS & CONDITIONS
            </Text>
            <Text style={{fontSize: 12,fontFamily: 'ProximaNova-Regular'}}>
            The following terms and conditions (“Terms & Conditions”) govern your use of the AXLE Technologies, LLC (“AXLE”) service which may consist of web sites, mobile applications, installed applications, our platform, and service offerings (“Service”). By accessing, viewing, or using the content, material, or services available on or through this Service, you (“You”) indicate that you have read and understand the Terms & Conditions and as they may change from time to time, and the terms and conditions of AXLE’s privacy policy (the “Privacy Policy”), which are hereby incorporated into these Terms and Conditions and made a part hereof by reference (collectively, the “Agreement”), and that you agree to the terms of the Agreement and intend to be legally bound by the Agreement. “You” refers to the individual using the AXLE Service and if You use the Service on behalf of a corporation, LLC, partnership, or other business entity, then You shall include that business entity and any individuals associated therewith using our Service. Once You accept this Agreement, You hereby acknowledge and agree that at any time, and at its sole discretion, AXLE may modify the Agreement by posting the modified Terms & Conditions and/or Privacy Policy on the Service, accessible via a link entitled AXLE Terms & Conditions and AXLE Privacy Policy, respectively. If You do not agree to this Agreement, You are not granted permission to access or use this Service.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:10}}>
              THE SECTIONS BELOW TITLED “BINDING ARBITRATION” AND “CLASS ACTION WAIVER” CONTAIN A BINDING ARBITRATION AGREEMENT AND CLASS ACTION WAIVER. THEY AFFECT YOUR LEGAL RIGHTS. PLEASE READ THEM.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            1.ABOUT THE SERVICE. AXLE’s Service provides a technology platform that enables freight brokers, shippers, 3PLs, and freight forwarders on the one hand (collectively, “Subscribers”), to subscribe to the Service and connect with and engage freight carriers, including trucking and shipping companies and owner-operator carriers (collectively, “Carriers”), on the other hand, for the purposes of transporting loads of freight from their place of origin with shippers, to the intended destinations (each, a “Job”). As part of the Service for Subscribers, AXLE provides access to its proprietary platform on a subscription basis, to permit Subscribers to maintain a database of approved Carriers; upload Jobs and communicate with AXLE’s network of Carriers about Jobs; engage Carriers to perform Jobs; and track Carriers’ Job progress. Subscribers may load their contact list of carriers to AXLE’s carrier database, which will become accessible to all Subscribers via the platform. Carriers may access and use the Service for access to, and notifications of, available Jobs; to accept Jobs; and to communicate with Subscribers about such Jobs. Carriers’ access to the Service does not include access to or use of the subscription-based platform.
AXLE does not provide transportation services and is not a transportation carrier. Further, AXLE is not a party to any contracts or transactions between Subscribers and Carriers (collectively, “Users”). Carriers are independent contractors and not employees of AXLE. By using the Service, You acknowledge and agree that AXLE (i) does not supervise, direct, control, or monitor Carriers or their performance of Jobs; (ii) is not responsible for and has no control over a User’s acts or omissions; and (iii) is not responsible for and has no control over the quality, safety, timing, legality, or any other aspect whatsoever of a Job posted through the Service or transactions between Subscribers and Carriers.


            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            2.APPROPRIATE USE.

By accessing and using the Service, You agree to comply with the following obligations:If You are accessing and using the Service as a Subscriber, You represent, warrant, and covenant to AXLE that
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            3.You are a bona fide shipper, freight broker, 3PL, or freight forwarder; that You have the right to enter into this Agreement; and that this Agreement does not conflict with any other agreement to which You are bound.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            4.You shall maintain all applicable licenses and legal authority to conduct the business of brokering freight, and that You will immediately cease use of the Service if for any reason You no longer maintain such licenses and legal authority.
You will not represent Yourself or Your employer as operating under the authority of any company, including any shipper, without express permission from such company.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
              You will not act as a job aggregator, and You will only post Jobs to the Service that you have a verifiable right to post.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
              You are a “motor carrier” as defined by 49 USC §13102(14), with authority to haul freight for hire, issued by the federal government and all applicable state governments.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            You will not accept any Job, or enter into any transaction to transport freight, without the appropriate carrier licenses and legal authority. You will not accept any Job, or enter into a transaction to transport freight, outside the geographic bounds of Your carrier authority. You must be authorized as an interstate carrier to use the Service in any way that involves interstate transport. If You are an intrastate carrier only, You are strictly prohibited from the use of the Service other than for intrastate purposes.
You will not accept any Job, or enter into a transaction, to transport commodities that You are not legally authorized to transport.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            You will not accept any Job, or enter into any transaction, to transport freight using equipment that fails to meet any applicable Federal or State regulations.
In addition to the foregoing, all Users of the Service represent, warrant, and covenant to AXLE that:
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
          You will not use the Service to enter into any transaction without the appropriate level of insurance coverage or bond
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
          You will not access or use the Service for the purpose of competing with AXLE. Without limiting the generality of the foregoing, You will not use AXLE rate information or other proprietary product information to develop a competitive lane rate product or provide AXLE rate or product/service information to any company considered by AXLE to be a competitor. You shall not attempt to mine or replicate the rate database in order to compete with AXLE. You agree that any violation of this provision shall result in irreparable harm suffered by AXLE, and that AXLE shall therefore be entitled to injunctive relief to enforce this provision. Further, AXLE may, without waiving any other remedies available to it under this Agreement or otherwise, seek from any court having jurisdiction any interim, equitable, provisional, or injunctive relief that is necessary to protect our rights.
          You will comply with all applicable federal, state, and local laws, rules, and regulations in your use of the Service and will not use the Service for any unlawful purpose
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
          You will not impersonate any person or entity or falsely state or otherwise misrepresent Your affiliation with a person or entity, or share information through the Service that would constitute or contain false or misleading indications of origin, endorsement or statements of fact.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
          You will not interfere with, or attempt to interrupt the proper operation of, the Service through the use of any virus, device, information collection or transmission mechanism, software or routine, or access or attempt to gain access to any content, data, files, or passwords related to the Service through hacking, password or data mining, or any other means.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            You will not decompile, reverse engineer, or disassemble any software or other products or processes accessible through the Service;
You will not cover, obscure, block, or in any way interfere with any advertisements and/or safety features on the Service.
You will not use any robot, spider, scraper, or other automated means to access the Service for any purpose without our express written permission.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            5.To access our Service, as a Subscriber or a Carrier, You must register with a username and password, and certain additional information that will assist in authenticating your identity when you log in in the future. You agree to provide true, accurate and complete information as prompted by the registration form and all forms You access on our site or our platform, or that You receive directly from an AXLE representative, and You agree to update this information to maintain its truthfulness, accuracy, and completeness. By registering to use the Service, You authorize AXLE to include certain data about You in the AXLE Directory. This includes publicly available data about Your company, such as your DOT profile information, as well as data You have provided AXLE about Your company and operations. All AXLE Directory information may be viewed by active AXLE users and subscribers. Please see our Privacy Policy for more information about how we collect, store, use, and process data.

Without the prior written permission of AXLE, You will not allow non-registered users access to the Service and will never provide your password to any non-registered user, nor will You share any information from the Service with any non-authorized users. It is a violation of these Terms & Conditions to share your login information.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            Subscribers to the Service who are provided access to our proprietary platform, enabling them to view our database of Carriers and manage their preferred and approved Carriers and Jobs (“Subscribers”) shall be subject to additional terms and conditions. Subscribers shall be responsible for the acts and omissions of each of its employees, contractors and other personnel who are authorized by Subscriber to access and use the Service and the platform (“Authorized Users”), and for any other person who accesses the Service and the platform using any access credentials of Subscriber or such Authorized Users. Use of any import/export capability to transfer information from a Subscriber’s computer system to the platform shall be restricted to one or more identified computers located at the address(es) provided to AXLE in writing by the Subscriber (the “Authorized Locations”), and shall not be distributed to any other location(s). Unless otherwise stated, all information downloaded or exported from the Service is intended for use by You or the Authorized User performing the download and shall not be distributed to any other users or locations.

All seats provided under a Subscriber’s subscription are for use by Authorized Users located at the Authorized Location(s). If desired, your Authorized Users may download a second copy of the platform on a home computer for temporary or occasional use for company business only.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:10}}>
            AXLE DISCLAIMER.
            </Text>
            <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            AXLE presents information in many ways through our websites; and Service. Our goal is to provide the most accurate information available in our complex and constantly changing transportation marketplace. While we endeavor to be as accurate and timely as possible, WE MAKE NO WARRANTY OR GUARANTEE CONCERNING ACCURACY, RELIABILITY, COMPLETENESS, OR SUITABILITY OF THE INFORMATION OR SERVICE PROVIDED BY US. THE SERVICE IS MADE AVAILABLE ON AN “AS IS” AND “AS AVAILABLE” BASIS ONLY. USE OF THIS SERVICE IS ENTIRELY AT YOUR OWN RISK. YOU ACKNOWLEDGE THAT SUCH INFORMATION AND MATERIALS MAY CONTAIN INACCURACIES OR ERRORS AND WE EXPRESSLY EXCLUDE LIABILITY FOR ANY SUCH INACCURACIES OR ERRORS TO THE FULLEST EXTENT PERMITTED BY LAW. AXLE MAKES NO REPRESENTATIONS OR WARRANTIES, AND HEREBY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, WITH RESPECT TO THIS SERVICE AND THE CONTENT ON AND MADE AVAILABLE THROUGH THIS SERVICE, AND THE SERVICES AND PRODUCTS OFFERED IN CONNECTION THEREWITH, EXPRESS AND IMPLIED, WRITTEN AND ORAL, ARISING FROM COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE OF TRADE, AND OTHERWISE, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, TITLE, QUALITY, SYSTEMS INTEGRATION, AND NON-INFRINGEMENT.
AXLE SHALL NOT BE LIABLE FOR ANY DIRECT, SPECIAL, INDIRECT, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY, EXTRA-CONTRACTUAL, OR PUNITIVE DAMAGES OF ANY KIND WHATSOEVER, INCLUDING, WITHOUT LIMITATION, LOST REVENUES OR LOST PROFITS, WHICH MAY OR DOES RESULT FROM THE USE OF, ACCESS TO, OR INABILITY TO USE THIS SERVICE, THE CONTENT, OR THE PRODUCTS OR SERVICES CONNECTED THEREWITH, REGARDLESS OF LEGAL THEORY, WHETHER OR NOT ANY PARTY HAD BEEN ADVISED OF THE POSSIBILITY OR PROBABILITY OF SUCH DAMAGES, AND EVEN IF THE REMEDIES OTHERWISE AVAILABLE FAIL THEIR ESSENTIAL PURPOSE. YOU ACKNOWLEDGE THAT AXLE’S SOLE OBLIGATION AND EXCLUSIVE RESPONSIBILITY IN THE EVENT OF MATERIAL AND CONTINUING NON-CONFORMITY, DEFECT OR ERROR IN THE SERVICE SHALL BE TO TAKE REASONABLE CORRECTIVE ACTIONS UPON DISCOVERY OF THE PROBLEM, AND IN NO EVENT SHALL AXLE AND/OR ITS THIRD PARTY INFORMATION PROVIDER’S BE HELD LIABLE UNDER THIS AGREEMENT. AXLE’S LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW.

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES. THEREFORE, SOME OF THE ABOVE LIMITATIONS ON WARRANTIES IN THIS SECTION MAY NOT APPLY TO YOU. NOTHING IN THESE TERMS OF USE SHALL AFFECT ANY NON-WAIVABLE STATUTORY RIGHTS THAT APPLY TO YOU.

AXLE does not make safety determinations. The AXLE Carrier vetting tab is aggregate content AXLE receives from Carrier when they register for the Service. It is solely the Subscriber’s responsibility to make sure that a Carrier is suitable to begin moving its loads and performing its Jobs. AXLE endeavors to keep this information as updated as possible, however, You must make your own determination as to safety, authority and/or business practices. It is each User’s sole responsibility, as a user of the Service, to check the credentials, including but not limited to the safety/authority record, of any party introduced to You by our Service.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:10}}>
            6.CHANGE TO TERMS & CONDITIONS/SERVICE & DISCONTINUANCE.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            AXLE may, from time to time, at our sole discretion, make changes to certain of the Terms & Conditions. Notification of any changes will be highlighted on the AXLE Service or the website, accessible via a link entitled AXLE Terms & Conditions. Your continued use of the Service after any changes shall constitute your agreement to the modified Terms & Conditions. AXLE reserves the right (1) to modify, discontinue or suspend any aspect of our Service or site at any time, and (2) to impose limitations on, or restrict access to, our Service without notice or liability to You or any third party.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:10}}>
            7.CHANGE TO TERMS & CONDITIONS/SERVICE & DISCONTINUANCE.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            AXLE may disclose to You, or You may otherwise learn of or discover, our documents, business practices, object code, source code, management styles, day-to-day business operations, capabilities, systems, current and future strategies, marketing information, financial information, software technologies, processes, procedures, methods and applications, or other aspects of our business (“Our Information”). You hereby agree and acknowledge that any and all of Our Information is confidential and shall be our sole and exclusive intellectual property and proprietary information. You agree to use Our Information only for the specific purposes as allowed by these Terms & Conditions. Any disclosure of Our Information to a third party, specifically including a direct competitor, is strictly prohibited and will be vigorously challenged in a court of law. All obligations contained herein shall survive the termination of this Agreement. Furthermore, You acknowledge that Our Information is proprietary, confidential and extremely valuable to us, and that we would be materially damaged by your disclosure of Our Information. You acknowledge and agree that monetary damages provide an insufficient remedy for the breach of this confidentiality obligation. You therefore agree that AXLE shall be entitled, in addition to other available remedies, to seek an injunction or other appropriate equitable relief from a court of competent jurisdiction restraining any breach, threatened or actual, of Your obligations hereunder. You hereby waive any requirement that AXLE post any bond or other security in the event any injunctive or equitable relief is sought by or awarded to AXLE to enforce this Section.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:10}}>
            8.PROPRIETARY RIGHTS.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:10}}>
            Information provided by AXLE or its third party information providers is protected by federal copyright law, and is proprietary to AXLE and/or its third party information providers.
            </Text>
            <View >
            <Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            Copyright.
            </Text>
            The protected information found on the Service includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited unless permission is granted in writing by AXLE. AXLE owns, solely and exclusively, all rights, title and interest in and to the AXLE Service, all the content (including, for example, audio, photographs, illustrations, graphics, pictures, drawings, sketches, other visuals, video, copy, recordings, software, artwork, images, text forms, etc.), code, data and materials thereon, the look and feel, design and organization of the Service, and the compilation of the content, code, data and materials on such Service, including but not limited to any copyrights, trademark rights, patent rights, database rights, moral rights, and other intellectual property and proprietary rights therein. Your use of the Service does not grant to You ownership of any content, code, data or materials You may access on these Services.

            </Text>
            </View>
            <View >
            <Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            Trademarks.
            </Text>
            The trademarks, service marks, and logos of AXLE (the “AXLE Trademarks”) used and displayed on the Service are registered and unregistered trademarks or service marks of AXLE. Other company, product, and service names located on the Service may be trademarks or service marks owned by others (the “Third-Party Trademarks,” and, collectively with AXLE Trademarks, the “Trademarks”). Nothing on the Service should be construed as granting, by implication, estoppel, or otherwise, any license or right to use the Trademarks, without our prior written permission specific for each such use. Use of the Trademarks as part of a link to or from any site is prohibited unless establishment of such a link is approved in advance by us in writing. All goodwill generated from the use of AXLE Trademarks inures to our benefit. If You would like to license the use of any AXLE Trademark or have questions regarding Trademarks, please contact us at legal@axletrucking.com. Elements of the Service are protected by trade dress, trademark, unfair competition, and other state and federal laws and may not be copied or imitated in whole or in part, by any means, including, but not limited to, the use of framing or mirrors.

            </Text>
            </View>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            9.USER AND SUBSCRIBER CONTENT.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            As a regular User, the Service may allow you to post and upload content to the Service. If You are a Subscriber, You will have access to the platform which allows you to upload content about Jobs, approved Carriers and other relevant information. Any content uploaded by a User (including any Subscriber) is referred to as “User Content.” You expressly acknowledge and agree that once you submit User Content for inclusion into the Service, there is no confidentiality or privacy with respect to such User Content, including, without limitation, any personally identifying information that You may make available. YOU, AND NOT AXLE, ARE ENTIRELY RESPONSIBLE FOR ALL USER CONTENT THAT YOU UPLOAD, POST, E-MAIL, OR OTHERWISE TRANSMIT VIA THE SERVICE. You retain all copyrights and other intellectual property rights in and to Your own User Content. You hereby grant AXLE and our sublicensees a royalty-free, perpetual, irrevocable, non-exclusive, sublicensable, right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, redistribute, transmit, perform and display such User Content (in whole or part) throughout the universe and/or to incorporate it in other works in any form, media, or technology now known or later developed for the full term of any rights that may exist in such User Content. By interacting with the Service or transferring information You agree that AXLE, its affiliates, and assigns are licensed to use the information in a manner we deem reasonable in our sole and independent judgment. Further, AXLE is free to use any ideas, concepts, know-how, techniques, and suggestions contained in any communications You send to this Service for any purpose whatever, including, but not limited to, creating and marketing products or services using such information, without compensation or attribution to You or any third party. AXLE welcomes your feedback and suggestions about how to improve our Service. If You submit User Content to us, each such submission constitutes a representation and warranty to AXLE that such User Content is Your original creation (or that you otherwise have the right to provide the User Content), that You have the rights necessary to grant the license to the User Content under this Section, and that it and its use by AXLE and its content partners as permitted by this Agreement does not and will not infringe or misappropriate the intellectual property or moral rights of any person or contain any libelous, defamatory, or obscene material.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            10.EXPORT RESTRICTIONS & COMPLIANCE WITH LAWS.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            This Service may refer to certain services or programs that are not available worldwide, without specifically identifying that such services or programs are geographically limited. Our reference to such services or programs does not imply that AXLE intends to offer such services or programs in all countries or locations. You may not access, download, or use the Service or any material provided on our site in violation of U.S. export laws or regulations. You and AXLE agree to comply fully with all applicable laws, rules, or regulations, domestic or foreign, including but not limited to the laws and regulations concerning import and export of goods, the Foreign Corrupt Practices Act and other laws prohibiting bribery, nondiscrimination, forced or involuntary labor, and equal opportunity in employment.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            11.EXTERNAL.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
          This Service may, from time to time, contain links to other Internet websites for the convenience of users in locating information, products, or services that may be of interest. These sites and any other sites operated or maintained by third parties are operated or maintained by organizations over which AXLE exercises no control, and AXLE expressly disclaims any and all responsibility for the content, information, links, and other items, the accuracy and completeness of the information, and the quality of products or services made available or advertised on these third-party sites. AXLE does not control, endorse, promote, or have any affiliation with any other website unless expressly stated herein.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            12.MOBILE SERVICES..
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            This Service may provide certain services that are available to You via your mobile phone or other mobile device if You have enabled them, including the ability to use Your mobile device to receive and reply to messages from AXLE and access certain other features (collectively, the “Mobile Services”). Your mobile carrier’s normal messaging, data, and other rates and fees may apply to Your use of the Mobile Services. In addition, downloading, installing, or using certain Mobile Services may be prohibited or restricted by your mobile carrier, and not all Mobile Services may work with all carriers or devices. Therefore, You are responsible for checking with your mobile carrier to determine if the Mobile Services are available for your mobile devices, what restrictions, if any, may be applicable to your use of the Mobile Services and how much they will cost You. By using the Mobile Services, You agree that AXLE may communicate with You by SMS, MMS or other electronic means to your mobile device and that certain information about your usage of the Mobile Services may be communicated to AXLE. In the event You change or deactivate your mobile telephone number, You agree to promptly update your mobile subscription account information with us to ensure that the messages AXLE intends to send to You are not sent to another entity who acquires such mobile telephone number.


            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            12.DOWNLOADING THE APPS FROM THE APP STORE.
            </Text>
            <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
              The following terms apply when you download the AXLE mobile application (the “App”) from Apple’s App Store. These terms are in addition to all other terms contained in the Agreement.

            </Text>
            <Text style={{fontSize: 14, fontFamily: 'ProximaNova-Regular', paddingTop:16}}>
            You acknowledge and agree that (i) the Agreement is concluded between you and AXLE only, and not Apple; and (ii) AXLE, not Apple, is solely responsible for the App and content thereof. Your use of the App must comply with the App Store Terms of Service.

You acknowledge that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App.

In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price, if any, for the applicable App to you and, to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the App. As between AXLE and Apple, any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty will be the sole responsibility of AXLE.

You acknowledge that, in the event of any third-party claim that the App or your possession and use of the App infringes that third party’s intellectual property rights, as between AXLE and Apple, AXLE, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such intellectual property infringement claim to the extent required by the Agreement.

You acknowledge and agree that Apple, and Apple’s subsidiaries, are third-party beneficiaries of the Agreement as related to your license of the App, and that, upon your acceptance of the terms and conditions of the Agreement, Apple will have the right (and will be deemed to have accepted the right) to enforce the Agreement as related to your license of the App against you as a third-party beneficiary thereof.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            13.TELEMARKETING AND TEXT MESSAGES..
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            Where You provide “prior express written consent” within the meaning of the Telephone Consumer Protection Act (“TCPA”), You consent to receive telephone calls, including artificial voice calls, pre-recorded messages and/or calls delivered via automated technology and text and SMS messages to the telephone number(s) that You provided from AXLE and the marketing partners listed in and/or hyperlinked to the consent. You are not required to provide this consent to obtain access to the Service, and Your consent simply allows us to contact you via these means. By accepting these Terms & Conditions, You provide consent to allow us to communicate with you through SMS messages and email. If You would like to opt out of this consent, please contact us at legal@axletrucking.com.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            14.SYSTEM REQUIREMENTS.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
           You agree to abide by recommended system requirements, including amendments and upgrades thereto as published by AXLE from time to time, and agree that AXLE’s Service shall not be installed or used on any computer system that does not meet minimum requirements.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            15.DRIVER SAFETY – CARRIERS.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            Carriers agree to assume full responsibility to drive safely, observe all traffic rules/laws and use their own personal best judgment while driving. As a Carrier, You agree that You will not enter or change information or otherwise interact with the Service while driving.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            16.MISUSE OF MEDIA POSTINGS, MONITORING, INDEMNIFICATION.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            Although AXLE may, from time to time, monitor or review discussions, chats, blogs, forums, social media postings, transmissions, bulletin boards, and the like on the Service, AXLE is under no obligation to do so and assumes no responsibility or liability arising from the content of any such locations nor for any error, defamation, libel, slander, omission, falsehood, obscenity, pornography, profanity, danger, or inaccuracy contained in any information contained within such locations on the Service. You are prohibited from posting or transmitting any unlawful, threatening, libelous, defamatory, obscene, scandalous, inflammatory, pornographic, or profane material or any material that could constitute or encourage conduct that could be considered a criminal offense, give rise to civil liability, or otherwise violate any law. AXLE will fully cooperate with any law enforcement authorities or court order requesting or directing AXLE to disclose the identity of anyone posting any such information or materials. AXLE reserves the right to remove messages or material posted by You, as a user of the Service, to message boards or other areas, at its sole discretion. By submitting messages and/or materials to the Service, You agree to indemnify, defend and hold harmless AXLE from all damages, costs and expenses, including reasonable attorneys’ fees and costs arising out of all claims, challenges or actions, including claims for infringement, libel and slander, related to your submission.

            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            INDEMNIFICATION.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            You agree to defend, indemnify, and hold harmless AXLE, its contractors/subsidiaries/affiliated companies, and all of their respective directors, officers, employees, representatives, proprietors, partners, shareholders, servants, principals, agents, predecessors, successors, assigns, and attorneys from and against any and all suits, actions, claims, proceedings, damages, settlements, judgments, injuries, liabilities, losses, risks, costs, and expenses (including without limitation attorneys’ fees and litigation expenses) relating to or arising from this Service, your use of this Service (or any derivatives of this Service offered to You) or any use under your password whether or not authorized by You, your fraud, violation of law, or willful misconduct, and any breach by You of these Terms & Conditions, including, but not limited to, your use of our site, uploading, emailing, posting, publishing, transmitting or submitting any content related to our site, or any misrepresentation, breach of warranty or certification made by You.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            17.SUBSCRIPTION.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            If You are a Subscriber, and unless otherwise provided by AXLE, You shall pay all subscription fees at the current rates in accordance with the current AXLE payment policies, which may be modified from time to time at the sole discretion of AXLE. You are responsible for all taxes. Certain subscription services may require pre-paid fees and AXLE payment policy may not apply to certain other services. All other payment terms shall be set forth in a separate writing between AXLE and its Subscribers.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            TERMINATION POLICY.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            AXLE may with or without notice, terminate Your access to this Service in the event You violate these Terms & Conditions or for any reason or no reason at AXLE’s sole discretion. AXLE may deny or cancel Service immediately at its sole discretion if complaints are received or for any other reason or no reason. You may request to terminate at any time upon no less than 30 days advance written notice. Upon termination, immediately discontinue Your use of the Service and destroy all materials obtained from the Service. Payment obligations, to the extent applicable and as agreed to by You in writing, in advance of termination, may survive termination.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            18.ADDITIONAL TERMS.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            Certain features, programs, products or services may contain separate terms and conditions, which are in addition to these AXLE Terms & Conditions. In the event of conflicting provisions, the additional terms and conditions will govern.

            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            19.BINDING ARBITRATION.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
              In the event of a dispute arising under or relating to this Agreement, the Service, or any portion thereof (each, a “Dispute”), either party may elect to finally and exclusively resolve the dispute by binding arbitration governed by the Federal Arbitration Act (“FAA”). Any election to arbitrate, at any time, shall be final and binding on the other party. IF EITHER PARTY CHOOSES ARBITRATION, NEITHER PARTY SHALL HAVE THE RIGHT TO LITIGATE SUCH CLAIM IN COURT OR TO HAVE A JURY TRIAL, EXCEPT EITHER PARTY MAY BRING ITS CLAIM IN ITS LOCAL SMALL CLAIMS COURT, IF PERMITTED BY THAT SMALL CLAIMS COURT RULES AND IF WITHIN SUCH COURT’S JURISDICTION. ARBITRATION IS DIFFERENT FROM COURT, AND DISCOVERY AND APPEAL RIGHTS MAY ALSO BE LIMITED IN ARBITRATION. All disputes will be resolved before a neutral arbitrator selected jointly by the parties, whose decision will be final, except for a limited right of appeal under the FAA. The arbitration shall be commenced and conducted by JAMS pursuant to its then current Comprehensive Arbitration Rules and Procedures and in accordance with the Expedited Procedures in those rules, or, where appropriate, pursuant to JAMS’ Streamlined Arbitration Rules and Procedures. All applicable JAMS’ rules and procedures are available at the JAMS website www.jamsadr.com. Each party will be responsible for paying any JAMS filing, administrative, and arbitrator fees in accordance with JAMS rules. Judgment on the arbitrator’s award may be entered in any court having jurisdiction. This clause shall not preclude parties from seeking provisional remedies in aid of arbitration from a court of appropriate jurisdiction. The arbitration may be conducted in person, through the submission of documents, by phone, or online. If conducted in person, the arbitration shall take place in the United States county where you reside. The parties may litigate in court to compel arbitration, to stay a proceeding pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator. The parties shall cooperate in good faith in the voluntary and informal exchange of all non-privileged documents and other information (including electronically stored information) relevant to the Dispute immediately after commencement of the arbitration. As set forth in Section 23 below, nothing in this Agreement will prevent us from seeking injunctive relief in any court of competent jurisdiction as necessary to protect our proprietary interests.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            20.CLASS ACTION WAIVER.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
              You agree that any arbitration or proceeding shall be limited to the Dispute between us and You individually. To the full extent permitted by law, (i) no arbitration or proceeding shall be joined with any other; (ii) there is no right or authority for any Dispute to be arbitrated or resolved on a class action-basis or to utilize class action procedures; and (iii) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons. YOU AGREE THAT YOU MAY BRING CLAIMS AGAINST US ONLY IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            21.EQUITABLE RELIEF.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            You acknowledge and agree that in the event of a breach or threatened violation of our intellectual property rights and confidential and proprietary information by you, we will suffer irreparable harm and will therefore be entitled to injunctive relief to enforce this Agreement. We may, without waiving any other remedies under this Agreement, seek from any court having jurisdiction any interim, equitable, provisional, or injunctive relief that is necessary to protect our rights and property pending the outcome of the arbitration referenced above. You hereby irrevocably and unconditionally consent to the personal and subject matter jurisdiction of the federal and state courts in the State of Delaware for purposes of any such action by us.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            22.MISCELLANEOUS PROVISIONS.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            You accept that AXLE has the right to change the content or technical specifications of any aspect of the Service at any time, at its sole discretion.
These Terms & Conditions, together with the Privacy Policy, and any updates to either document, represent the entire agreement between You and AXLE with respect to the subject matter hereof, supersede any and all prior and contemporaneous written and oral representations, understandings, and agreements between us, and will be governed by and construed in accordance with the laws of the State of Delaware. The waiver or failure of AXLE to exercise in any respect any right provided hereunder shall not be deemed a waiver of such right in the future or a waiver of any other rights established under these Terms & Conditions. In the event AXLE retains legal counsel to enforce this agreement it shall be entitled to receive attorney’s fees, including fees on appeal, whether or not suit or action is commenced. If any provision of the Terms & Conditions is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties’ intentions as reflected in the provision, and the other provisions of the Terms & Conditions remain in full force and effect.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', paddingTop:14}}>
            23.CONTACT US.
            </Text>
            <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Regular', paddingTop:14}}>
            If you wish to report a concern regarding these Terms & Conditions, have any questions or need assistance, please contact AXLE via email at legal@axletrucking.com or by telephone at 551-804-8218.

            </Text>

        </View>


      </View>
      </ScrollView>
    )
  }
}
