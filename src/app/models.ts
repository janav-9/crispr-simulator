export interface CRISPRresult{
    end:number,
    gc:number
    hit_12mer:number,
    hit_20mer:number,
    hit_8mer:number,
    resite:any,
    sequence:string,
    start:number,
    strand:string,
    tm:any,
    tttt:any
}

export interface APIresult{
error:string,
pam_sequence:string,
program_name:string,
results:CRISPRresult[],
sequence_name:string,
specificity_check:string,
time:string
}