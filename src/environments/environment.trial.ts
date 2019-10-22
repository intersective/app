export const environment = {
  production: true,
  appkey: 'b11e7c189b',
  pusherKey: '255f010d210933ca7675',
  env: 'live',
  APIEndpoint: 'https://trial.practera.com/',
  intercomAppId: '',
  filestack: {
    key: 'AO6F4C72uTPGRywaEijdLz',
    s3Config: {
      location: 's3',
      container: 'practera-aus',
      region: 'ap-southeast-2',
      paths: {
        any: '/appv2/live/uploads/',
        image: '/appv2/live/uploads/',
        video: '/media/fpvideo/upload/'
      },
      workflows: [
        '3c38ef53-a9d0-4aa4-9234-617d9f03c0de'
      ],
    }
  },
  defaultCountryModel: 'AUS',
  intercom: true,
  goMobile: false,
};
