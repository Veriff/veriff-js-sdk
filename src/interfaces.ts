import { FormLabel, PersonData } from './template';

export interface Options {
  host?: string;
  apiKey: string;
  parentId: string;
  onSession: (err, response) => void;
  lang?: string;
}

export interface MountOptions {
  formLabel?: FormLabel;
  submitBtnText?: string;
  loadingText?: string;
}

export interface Params {
  person?: PersonData;
  vendorData?: string;
  lang?: string,
}

export interface VeriffSDKInstance {
  params: Params;
  setParams: (params: Params) => void;
  mount: (options: MountOptions) => void;
}
