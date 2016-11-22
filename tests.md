# Testing
This report documents the manual and unit testing results. Because there are not very many tests, they should be manually double checked against unit tests. This document does not include the most up to date unit testing results. Its purpose is to serve as a formal source of test results including completion dates. These tests are copied from the `Assignment-5-Test-Plan.doc` document provided by the prof. 

## Testing Guidelines
When tests are run and results are added to this document, please ensure to do the following:

- Complete the `Last Tested *` columns so we know when tests we're last completed. 
- Append &#10004; `&#10004;` or &#x2717; `&#x2717;` to the Test Name when it passes or fails.
- Add Extra Notes if applicable
- Add commit message using the following format:
  - Tested N-001 ✓, E-001 ✗, etc.

Because this file is tracked by .git, the change history can also act as a record of test history which is handy. You can view the test history by going to [this link](https://github.com/BenLorantfy/SOA-A5/commits/master/tests.md)

## TEST DECK #1
| Test Name                | N-001 &#10004;                                                                                    | 
|--------------------------|---------------------------------------------------------------------------------------------------| 
| Test Description         | Try to log in as an existing user                                                                 | 
| Test Procedure           | **1.** Login as user ed **2.** Record your Actual Results to indicate whether a ed directory exists in HOST | 
| Expected Results         | Client should not create remote ed directory, but allow login                                   | 
| Last Tested Date         | Nov 20th 2016                                                                                                  | 
| Last Tested Version      | 0.0.0                                                                                                   | 
| Last Tested Commit       | 12372ca                                                                                                  | 
| Last Tested By           | [BenLorantfy](https://github.com/BenLorantfy)                                                                                                   | 
| Actual Results (Unit)    | Client does not create an ed directory because it already exists, but ed is stil able to login                                                                                                   | 
| Actual Results (Mannual) | Client does not create an ed directory because it already exists, but ed is stil able to login                                                                                                | 
| Extra Notes              | Automated unit test and manual test both pass                                                                                   | 

| Test Name                | E-001 &#x2717;                                                                                                                                                                                                      | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Try to create a directory under user ed                                                                                                                                                                  | 
| Test Procedure           | **1.** Use your client application to try and create a new directory in ed’s space. **2.** Try to create a directory called myStuff **3.** Record your observations of the client application / web-service in the Extra Notes | 
| Expected Results         | Client should trap the exception and report directory exists                                                                                                                                               | 
| Last Tested Date         | Nov 18th 2016                                                                                                  | 
| Last Tested Version      | 0.0.0                                                                                                   | 
| Last Tested Commit       | N/A                                                                                                   | 
| Last Tested By           | [BenLorantfy](https://github.com/BenLorantfy)                                                                                                   | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | E-002                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Try to upload a file to \ed\myStuff                                                                                                                                                                 | 
| Test Procedure           | **1.** Locate the file CLIENT\throwAway\tmp\garbage\readme in your CLIENT space **2.** Upload it and save it to the same filename in the \ed\myStuff directory **3.** Record your observations of the client application / web-service in the Extra Notes 
| Expected Results         | Client should trap exception not allowed to write (directory is read-only) and report back                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | E-003                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Try to copy file to \ed\yourStuff                                                                                                                                                                 | 
| Test Procedure           | **1.** Before beginning this test – locate the file called sample.xls in the HOST\ed\yourStuff  subdirectory **2.** Open the file in Excel™  (you may have to click the enable button to activate the spreadsheet) **3.** Now, using your client – locate the following file CLIENT\dir 2\docs\sample.xls and UPLOAD it to the \ed\yourStuff directory – using the same name **4.** Record your observations of the client application / web-service in the Extra Notes **5.** Make sure to close Excel™ to release the file after this test has been executed
| Expected Results         | Client should trap exception of file sharing and report back                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | E-004                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Try to create a directory in the remote location (HOST) that already exists                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application go to the ed directory and record what directories you see there in the “Extra Notes” section below **2.** Now try to create a directory called hiddenStuff here **3.** Record your observations of the client application / web-service in the Extra Notes
| Expected Results         | Client should trap exception (directory already exists) and report back                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

## TEST DECK #2
| Test Name                | N-002 &#10004;                                                                                                                                                                                              | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Try to log in as new user                                                                                                                                                             | 
| Test Procedure           | **1.** within your client application – login as a new user (forget about that ed guy) **2.** login as a user called <TeamNameHere> (e.g. MattGregIanJohn) as instructed previously **3.** Record your Actual Results to indicate whether a <TeamNamesHere> directory exists in HOST
| Expected Results         | Client should create directory <TeamNameHere> in the HOST subdirectory and allow login                                                                                                                                               | 
| Last Tested Date         | Nov 21st 2016                                                                             | 
| Last Tested Version      | 0.0.0                                                                                            | 
| Last Tested Commit       | 95956f7                                                                                         | 
| Last Tested By           | [abasheer-cc](https://github.com/abasheer-cc)                                                                       | 
| Actual Results           | Client should create directory <TeamNameHere> in the HOST subdirectory and allow login                                                                                                                                                                                                           | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) | Client should create directory <TeamNameHere> in the HOST subdirectory and allow login                                                                                                                                                                                                           | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | N-003                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Create <team> subdirectories                                                                                                                                                             | 
| Test Procedure           | **1.** using your client application create the following subdirectories “dir1”, “dir 2” (note the space in the directory name) and  “throwAway” within your user space **2.** Record your Actual Results to indicate whether the subdirectories were created
| Expected Results         | Client should create directories as required                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | N-004                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Create of other directories and upload some files                                                                                                                                                             | 
| Test Procedure           | **1.** Please traverse the following subdirectories and upload the following files from the CLIENT space to your team space on the HOST.  Please maintain the directory structure and filenames in the HOST space when you UPLOAD. o	\dir1\bin 	testFile.bin o	\dir1\images 	CrackMeUp-1.jpg 	CrackMeUp-2.jpg 	DoYouKnowThesePeople.jpg 	funny.jpg 	WhoIsThisGuy.jpg o	\dir1\text 	mt.txt 	sample.txt **2.** •	Record your Actual Results to indicate which subdirectories and/or files were not created 
| Expected Results         | Client should create directories as required and copy files as needed                                                                                                                                              | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | N-005                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Creation of other directories and upload some files                                                                                                                                                            | 
| Test Procedure           | **1.** Please traverse the following subdirectories and upload the following files and create the following directory from the CLIENT space to your team space in the HOST space – again, maintain the directory structure and filenames … o	\throwAway 		Create Directory in HOST o	\throwAway\tmp 		Create Directory in HOST o	\throwAway\tmp\dontNeed 		Create Directory in HOST o	\throwAway\tmp\dontNeed\forget It 		Create Directory in HOST o	\throwAway\tmp\dontNeed\forget It\What The 			Create Directory in HOST  	readme (Does your client show you this file ?) 	hidden.txt  (Does your client show you this file?)  o	\throwAway\tmp\garbage  	Readme  (Does your client show you this file ?)  **2.** •	Record your Actual Results below and answer the questions above to indicate what happened. 
| Expected Results         | Client should create directories as required and copy files as needed                                                                                                                                              | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           | Look in your <TeamNamesHere> directory structure to see if the following files were created 	\throwAway\tmp\dontNeed\forget It\What The\readme 	\throwAway\tmp\dontNeed\forget It\What The\hidden.txt 	\throwAway\tmp\garbage\Readme                                                                                                                                                                                                           | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | N-006                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Manually moving some special files                                                                                                                                                              | 
| Test Procedure           | **1.** Create the following directory structure in the HOST space o	\dir 2 o	\dir 2\archive o	\dir 2\docs **2.** Copy the following files from the CLIENT to the HOST – maintaining the same name •	\dir 2\archive o	2011 OMHRSXMLSchema_V0.1.zip o	funny.zip •	\dir 2\docs o	funny.doc o	Assign-4.doc o	sample.xls **3.** Open and verify all of the files just moved within your HOST directory.  Tell me if they are all intact in the Actual Results section below.  Make note of any special observations in the Extra Notes section.
| Expected Results         | Client should create directories as required and copy files as needed                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | N-007                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Using the client application to delete a file and a directory in the HOST space                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application, locate the following file in the HOST directory and delete o	\throwAway\tmp\garbage\readme **2.** Now locate the following directory in the HOST and delete •	\throwAway\tmp\garbage **3.** Record whether the file and directory deletion worked in the Actual Results below
| Expected Results         | Client should be able to delete a file and delete a directory                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | N-008                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Using the client application to UPLOAD and rename a file                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application, locate the following file in the CLIENT space o	\dir1\text\sample.txt  **2.** UPLOAD and save it in the HOST in the following location and as the following name •	\dir1\simple.txt **3.** Verify that the client was able to upload and rename the file to the new location
| Expected Results         | Client should be able to rename a file when uploading                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | N-009                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Using the client application to DOWNLOAD some files from the HOST                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application, create the following new directory in the CLIENT space o	\dir1\copies **2.** Again using the client application, locate the following files in the HOST and DOWNLOAD and save all files to the newly created directory.  There is no need to maintain the directory structure – place all files in the “copies” directory o	\dir1\bin 	testFile.bin o	\dir1\images 	CrackMeUp-1.jpg 	CrackMeUp-2.jpg 	DoYouKnowThesePeople.jpg 	funny.jpg 	WhoIsThisGuy.jpg o	\dir1\text 	mt.txt 	sample.txt **3.** Verify that the client was able to download all files to the new directory location by opening and viewing all of the JPG images just transferred into the “copies” directory in the CLIENT.  Make note of any observations in the Extra Notes section below. 
| Expected Results         | Client should be able to DOWNLOAD files successfully.                                                                                                                                              | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | E-005                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Try to create a directory in a disallowed location.                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application try to traverse to and create the following directory.  Please note that the troll directory will be at the same directory level as the ed and <TeamNameHere> directories o	\HOST\troll **2.** Record whether you were able to use your application to create the Troll directory in the Actual Results below.  Make note of any special observations (errors reported, etc.) in the Extra Notes section
| Expected Results         | Client should not be permitted to traverse to and/or create the new directory                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

## TEST DECK #3
| Test Name                | B-001                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Multiple CLIENT file / directory selection and UPLOADING                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application, select the following directory in the CLIENT and UPLOAD to the HOST o	\dir 2 **2.** Verify in the <TeamNamesHere-BULK> directory in the HOST all files are present and accounted for as noted in the Actual Results
| Expected Results         | Client should create directories as required and copy files as needed                                                                                                                                               | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           | Do you see the following directory structure and files in the HOST ? •	\dir 2\archive o	2011 OMHRSXMLSchema_V0.1.zip o	funny.zip •	\dir 2\docs o	funny.doc o	Assign-4.doc o	sample.xls                                                                                                                                                                                                           | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | B-002                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Multiple HOST file selection and DOWNLOADING                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application, create the following directory in your CLIENT space o	\dir 2\docCopies **2.** Do a multiple selection of the following files in the HOST and DOWNLOAD  to this new directory in your CLIENT o	\dir 2\docs 	funny.doc  	Assign-4.doc 	sample.xls **3.** Verify that all selected files were DOWNLOADED and saved in the CLIENT directory in the Actual Results
| Expected Results         | Client should allow multiple file selection and download                                                                                                                                              | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           | Do you see the following directory structure and files in the HOST ? •	\dir 2\archive o	2011 OMHRSXMLSchema_V0.1.zip o	funny.zip •	\dir 2\docs o	funny.doc o	Assign-4.doc o	sample.xls                                                                                                                                                                                                           | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

| Test Name                | B-003                                                                                                                                                                                               | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Multiple HOST file selection and DELETE                                                                                                                                                             | 
| Test Procedure           | **1.** Using your client application, locate the following HOST directory and DELETE o	\dir 2\archive **2.** Verify that all selected files and subdirectories were DELETED in the HOST
| Expected Results         | Client should allow multiple file / directory selection and deletion                                                                                                                                              | 
| Last Tested Date         |                                                                                                 | 
| Last Tested Version      |                                                                                                  | 
| Last Tested Commit       |                                                                                                 | 
| Last Tested By           |                                                                                            | 
| Actual Results           | Do you see the following directory structure and files in the HOST ? •	\dir 2\archive o	2011 OMHRSXMLSchema_V0.1.zip o	funny.zip •	\dir 2\docs o	funny.doc o	Assign-4.doc o	sample.xls                                                                                                                                                                                                           | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                       | 

