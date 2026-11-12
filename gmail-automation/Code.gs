function doGet(){return HtmlService.createHtmlOutputFromFile('Index').setTitle('REXORA AI MATCH').addMetaTag('viewport','width=device-width, initial-scale=1');}
function searchResumeAttachments(requirement,pageToken){
 if(!requirement||!String(requirement).trim())throw new Error('Enter the client requirement first.');
 const start=pageToken?Number(pageToken):0,threads=GmailApp.search('has:attachment',start,20),files=[];
 threads.forEach(thread=>thread.getMessages().forEach(message=>message.getAttachments({includeInlineImages:false,includeAttachments:true}).forEach(att=>{
  const name=att.getName()||'resume',type=(att.getContentType()||'').toLowerCase();
  if(!(type.includes('pdf')||/\.(pdf|docx?)$/i.test(name)))return;
  const bytes=att.getBytes();if(bytes.length>8*1024*1024)return;
  files.push({fileName:name,contentType:type,base64:Utilities.base64Encode(bytes),emailSubject:message.getSubject()||'',emailFrom:message.getFrom()||'',emailDate:message.getDate().toISOString()});
 })));
 return {files:files,nextPageToken:threads.length===20?String(start+20):null,scannedThreads:threads.length};
}