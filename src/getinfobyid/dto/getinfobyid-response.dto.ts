enum Status {
  New = 0,
  Active,
  Paused,
  Inactive,
}

enum OS {
  iOS = 0,
  Android,
}

export class GetInfoByIdSuccessResponse {
  result: {
    id: string;
    size: number;
    used: number;
    description: string;
    name: string;
    status: Status;
    ping: number;
    apps: [
      {
        id: string;
        bundleId: string;
        title: string;
        platform: OS;
      },
    ];
  };
}

export class GetInfoByIdCommonError {
  code: string;
  message: string;
  data: object;
}
