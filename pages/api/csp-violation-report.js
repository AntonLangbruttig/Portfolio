// // pages/api/csp-violation-report.js
// export default function handler(req, res) {
//     if (req.method === 'POST') {
//       const report = req.body; // The CSP violation report sent by the browser
//       console.log('CSP Violation Report:');
//       console.log(JSON.stringify(report, null, 2)); // Pretty-print the full report
  
//       // Safely destructure the report
//       const cspReport = report['csp-report'] || {};
//       const {
//         'document-uri': documentUri = 'Unknown document URI',
//         'blocked-uri': blockedUri = 'Unknown blocked URI',
//         'violated-directive': violatedDirective = 'Unknown directive',
//         'line-number': lineNumber = 'N/A',
//         'column-number': columnNumber = 'N/A',
//         'source-file': sourceFile = 'Unknown source file',
//         'script-sample': scriptSample = 'No sample available',
//       } = cspReport;
  
//       console.error(
//         `[CSP Violation] ${violatedDirective}\n` +
//         `  Document: ${documentUri}\n` +
//         `  Blocked URI: ${blockedUri}\n` +
//         (sourceFile !== 'Unknown source file' ? `  Source File: ${sourceFile}\n` : '') +
//         (lineNumber !== 'N/A' ? `  Line: ${lineNumber}, Column: ${columnNumber}\n` : '') +
//         (scriptSample !== 'No sample available' ? `  Code Snippet: ${scriptSample}\n` : '')
//       );
  
//       res.status(204).end(); // No content response, as per CSP spec
//     } else {
//       res.status(405).json({ error: 'Method not allowed' });
//     }
//   }