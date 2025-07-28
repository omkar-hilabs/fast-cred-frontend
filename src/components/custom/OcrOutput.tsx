import { Badge } from "@/components/ui/badge";

export const OcrOutput = ({ data, type }: { data: any, type: string }) => {



    if (!data) return <p className="text-sm text-muted-foreground">No OCR data available</p>;
    if (type === "dl") {
        return (
            <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                <p><strong>First Name:</strong> {data.fn || 'N/A'} <Badge variant="outline" className="ml-2">{(data.fn_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Last Name:</strong> {data.ln || 'N/A'} <Badge variant="outline" className="ml-2">{(data.ln_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>DL Number:</strong> {data.dl || 'N/A'} <Badge variant="outline" className="ml-2">{(data.dl_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Date of Birth:</strong> {data.dob || 'N/A'} <Badge variant="outline" className="ml-2">{(data.dob_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Expiry Date:</strong> {data.exp || 'N/A'} <Badge variant="outline" className="ml-2">{(data.exp_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                {/* <p><strong>Class:</strong> {data.class || 'N/A'} <Badge variant="outline" className="ml-2">{(data.class_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Sex:</strong> {data.sex || 'N/A'} <Badge variant="outline" className="ml-2">{(data.sex_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Hair:</strong> {data.hair || 'N/A'} <Badge variant="outline" className="ml-2">{(data.hair_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Eyes:</strong> {data.eyes || 'N/A'} <Badge variant="outline" className="ml-2">{(data.eyes_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Height:</strong> {data.hgt || 'N/A'} <Badge variant="outline" className="ml-2">{(data.hgt_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Weight:</strong> {data.wgt || 'N/A'} <Badge variant="outline" className="ml-2">{(data.wgt_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p> */}
            </div>
        );
    }

    if (type === "npi") {
        return (
            <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                <p><strong>NPI:</strong> {data.npi || 'N/A'} <Badge variant="outline" className="ml-1">{(data.npi_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p className="flex"><strong>Enumeration Date:</strong> {data["Enumeration Date"] || 'N/A'} <Badge variant="outline ml-1">{(data["Enumeration_Date_confident_score"] * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Status:</strong> {data.Status || 'N/A'} <Badge variant="outline" className="ml-2">{(data["Status_confident_score"] * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Primary Practice Address:</strong> {data["Primary Practice Address"] || 'N/A'} <Badge variant="outline" className="ml-1">{(data["Primary_Practice_Address_confident_score"] * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
            </div>
        );
    }

    if (type === "passport") {
        return (
            <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                <p><strong>First Name:</strong> {data.fn || 'N/A'} <Badge variant="outline" className="ml-2">{(data.fn_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Last Name:</strong> {data.ln || 'N/A'} <Badge variant="outline" className="ml-2">{(data.ln_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Passport Number:</strong> {data.dl || 'N/A'} <Badge variant="outline" className="ml-2">{(data.dl_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
            </div>
        );
    }

    if (type === "degree") {
        return (
            <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
                <p><strong>License Type</strong> {data.type || 'N/A'} <Badge variant="outline" className="ml-2">{(data.type_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>IssueDate</strong> {data.issueDate || 'N/A'} <Badge variant="outline" className="ml-2">{(data.issueDate_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
                <p><strong>Institution</strong> {data.institution || 'N/A'} <Badge variant="outline" className="ml-1">{(data.institution_confident_score * 100)?.toFixed(0) || 'N/A'}%</Badge></p>
            </div>
        );
    }

    // fallback for unknown types
    return (
        <div className="space-y-2 text-sm bg-muted p-3 rounded-md h-full">
            <p><strong>License Type:</strong> {data?.type || 'N/A'} <Badge variant="outline" className="ml-2">{data?.confidence?.type || 'N/A'}%</Badge></p>
            <p><strong>License Number:</strong> {data?.number || 'N/A'} <Badge variant="outline" className="ml-2">{data?.confidence?.number || 'N/A'}%</Badge></p>
            <p><strong>Issue Date:</strong> {data?.issueDate || 'N/A'} <Badge variant="outline" className="ml-2">{data?.confidence?.issueDate || 'N/A'}%</Badge></p>
            <p><strong>Expiry Date:</strong> {data?.expiryDate || 'N/A'} <Badge variant="outline" className="ml-2">{data?.confidence?.expiryDate || 'N/A'}%</Badge></p>
        </div>
    );
};
