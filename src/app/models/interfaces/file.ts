export class IFile {
  id?: string;
  label?: string;
  description?: string;
  type?: string;
  extension?: string;
  size?: string;
  author?: {
    id?: string;
    name?: string;
    username?: string;
    numTel?: string;
    email?: string;
    isAssigned?: true;
  };
  company?: {
    id?: string;
    shortname?: string;
    longname?: string;
  };
  expense?: {
    id?: string;
    shortname?: string;
    longname?: string;
  };
  vehicle?: {
    id?: string;
    numImat?: string;
    type?: string;
    isAssigned?: true;
  };
  travel?: {
    id?: string;
    refTravel?: string;
    status?: string;
  };
  invoice?: {
    id?: string;
    numInvoice?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IBuffer {
  name: string;
  buffer: {
    data: Buffer;
    type: string;
  };
}
