# REXORA AI MATCH — Gmail edition

Google Apps Script web app: searches Gmail messages with attachments, extracts PDF and DOCX CV text in the browser, ranks candidates against a client requirement, and downloads a dated ZIP with an Excel shortlist and CVs.

## Privacy
- Gmail scope is read-only (gmail.readonly).
- Does not send, delete, label, move, or modify emails.
- CV data is processed in the browser and is not saved to Drive or GitHub.
- This repository is public: never commit CVs, Gmail exports, tokens, or candidate data.
- Deploy as Execute as: Me; Who has access: Only myself.

## Setup
1. Sign in to https://script.google.com/ with the Gmail account that receives CVs and create a standalone project.
2. Add a script file named Code and paste Code.gs.
3. Add an HTML file named Index and paste Index.html.
4. In Project Settings enable the appsscript.json manifest editor and paste the manifest from this folder.
5. Save, then Deploy > New deployment > Web app.
6. Choose Execute as: Me and Who has access: Only myself. Deploy and approve Gmail read-only access.
7. Open the deployment URL, enter the client requirement, search Gmail, and download the ZIP.

## Output
Folder name format: REQUIREMENT_YYYY-MM-DD
- Candidate_Shortlist.xlsx (S.No, Name, Location, Phone, Experience, score, status, email and source details)
- Matched_CVs/
- All_Readable_CVs/

## V1 limitations
- Supports PDF and DOCX attachments up to 8 MB; legacy DOC, scanned/image-only PDFs, encrypted files, and some malformed files may not parse.
- Gmail query is has:attachment; Gmail excludes Spam and Trash from ordinary search.
- Up to 150 CV attachments per run, in batches of 20 threads.
- Matching is keyword/rule based, not a trained AI model. Verify certificate scope (including PCN 3.1/3.2), experience and contact details against original CVs before client submission.
- Uses browser libraries from public CDNs (PDF.js, Mammoth, SheetJS, JSZip).
