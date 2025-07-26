import { CheckCircle, XCircle, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";

export const VerificationOutput = ({ data, type,}: { data: any; type: string;}) => {
  if (!data) {
    return (
      <div className="text-sm text-muted-foreground p-3 rounded-md bg-muted">
        No verification data available.
      </div>
    );
  }

  if (type === "dl") {
    return (
        <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
            <PdfMatch data={data}/>
            <div className="flex items-start gap-2 text-green-600">
                <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <span>OTP Verified</span>
            </div>
        </div>
    );
 }

    if (type === "npi") {
        return (
            <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                <PdfMatch data={data}/>
                <div className="flex items-start gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
                    <span>Verified with NPI API</span>
                </div>
            </div>
        );
    }
    
    if (type === "cv/resume") {
        return (
            <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                <PdfMatch data={data}/>
                <div className="flex items-start gap-2 text-gray-600">
                    <Clock className="h-5 w-5 mt-0.5 shrink-0" />
                    <span>Veirifcation with institution pending</span>
                </div>
            </div>
        );
    }
};

const PdfMatch = ({data}: {data: any}) => {
    const [expanded, setExpanded] = useState(false);
    const match = data?.match;
    const reason = data?.reason || "No reason provided.";
    const confidence = data?.confidance_score;
    
    return (<div className={`flex items-start gap-2 ${match ? "text-green-600" : "text-red-600"}`}>
        {match ? (<CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />) : (<XCircle className="h-5 w-5 mt-0.5 shrink-0" />)}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span>Sample Pdf Match</span>
            <button onClick={() => setExpanded(!expanded)} className="text-muted-foreground hover:text-primary transition">
              {expanded ? (<ChevronUp className="h-4 w-4" />) : (<ChevronDown className="h-4 w-4" />)}
            </button>
          </div>

          {expanded && (
            <div className="mt-2 text-muted-foreground border-l-2 pl-3 border-gray-300">
              <strong>Reason:</strong> {reason}
            </div>
          )}
        </div>
      </div>)
} 




// export const VerficationOutput = () => {
//     return (
//         <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
//             <div className="flex items-start gap-2 text-green-600">
//                 <CheckCircle className="h-5 w-5 mt-0.5 shrink-0" />
//                 <span>Verified with {verificationCentre?.type || 'State Board'} API</span>
//             </div>
//                 <div className="flex items-start gap-2 text-muted-foreground">
//                 <Clock className="h-5 w-5 mt-0.5 shrink-0" />
//                 <span>NPDB Check Pending</span>
//             </div>
//         </div>
//     );
// }