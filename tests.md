# Testing
This report documents the manual and unit testing results. Because there are not very many tests, they should be manually double checked against unit tests. This document does not include the most up to date unit testing results. Its purpose is to serve as a formal source of test results and completion dates. These tests are copied from the `Assignment-5-Test-Plan.doc` document provided by the prof. When tests are run and results are added to this document, please ensure to do the following:

- Complete the `Last Tested *` columns so we know when tests we're last completed. 
- Append &#10004; `&#10004;` or &#x2717; `&#x2717;` to the Test Name when it passes or fails.
- Add Extra Notes if applicable

Because this file is tracked by .git, the change history can also act as a record of test history which is handy. You can view the test history by going to [this link](https://github.com/BenLorantfy/SOA-A5/commits/master/tests.md)

## TEST DECK #1
| Test Name                | N-001 &#x2717;                                                                                    | 
|--------------------------|---------------------------------------------------------------------------------------------------| 
| Test Description         | Try to log in as an existing user                                                                 | 
| Test Procedure           | **1.** Login as user Sean **2.** Record your Actual Results to indicate whether a Sean directory exists in HOST | 
| Expected Results         | Client should not create remote Sean directory, but allow login                                   | 
| Last Tested Date         | Nov 18th 2016                                                                                                  | 
| Last Tested Version      | 0.0.0                                                                                                   | 
| Last Tested Commit       | N/A                                                                                                   | 
| Last Tested By           | [BenLorantfy](https://github.com/BenLorantfy)                                                                                                   | 
| Actual Results (Unit)    |                                                                                                   | 
| Actual Results (Mannual) |                                                                                                   | 
| Extra Notes              |                                                                                                   | 

| Test Name                | E-001 &#x2717;                                                                                                                                                                                                      | 
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Test Description         | Try to create a directory under user Sean                                                                                                                                                                  | 
| Test Procedure           | **1.** Use your client application to try and create a new directory in Sean’s space. **2.** Try to create a directory called myStuff **3.** Record your observations of the client application / web-service in the Extra Notes | 
| Expected Results         | Client should trap the exception and report directory exists                                                                                                                                               | 
| Last Tested Date         | Nov 18th 2016                                                                                                  | 
| Last Tested Version      | 0.0.0                                                                                                   | 
| Last Tested Commit       | N/A                                                                                                   | 
| Last Tested By           | [BenLorantfy](https://github.com/BenLorantfy)                                                                                                   | 
| Actual Results           |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
| Actual Results (Unit)    |                                                                                                                                                                                                            | 
| Actual Results (Mannual) |                                                                                                                                                                                                            | 
| Extra Notes              |                                                                                                                                                                                                            | 
