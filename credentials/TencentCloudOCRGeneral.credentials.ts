import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TencentCloudOCRGeneralApi implements ICredentialType {
	name = 'tencentCloudOCRGeneralApi';
	displayName = 'Tencent Cloud OCR General API';
	documentationUrl = 'https://cloud.tencent.com/document/product/866';
	properties: INodeProperties[] = [
		{
			displayName: 'Secret ID',
			name: 'secretId',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: '腾讯云访问密钥ID',
		},
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: '腾讯云访问密钥Key',
		},
		{
			displayName: 'Region',
			name: 'region',
			type: 'options',
			options: [
				{
					name: 'Beijing (ap-beijing)',
					value: 'ap-beijing',
				},
				{
					name: 'Shanghai (ap-shanghai)',
					value: 'ap-shanghai',
				},
				{
					name: 'Guangzhou (ap-guangzhou)',
					value: 'ap-guangzhou',
				},
				{
					name: 'Chengdu (ap-chengdu)',
					value: 'ap-chengdu',
				},
				{
					name: 'Chongqing (ap-chongqing)',
					value: 'ap-chongqing',
				},
				{
					name: 'Nanjing (ap-nanjing)',
					value: 'ap-nanjing',
				},
				{
					name: 'Shanghai Finance (ap-shanghai-fsi)',
					value: 'ap-shanghai-fsi',
				},
				{
					name: 'Shenzhen Finance (ap-shenzhen-fsi)',
					value: 'ap-shenzhen-fsi',
				},
				{
					name: 'Hong Kong (ap-hongkong)',
					value: 'ap-hongkong',
				},
				{
					name: 'Singapore (ap-singapore)',
					value: 'ap-singapore',
				},
				{
					name: 'Bangkok (ap-bangkok)',
					value: 'ap-bangkok',
				},
				{
					name: 'Seoul (ap-seoul)',
					value: 'ap-seoul',
				},
				{
					name: 'Tokyo (ap-tokyo)',
					value: 'ap-tokyo',
				},
				{
					name: 'Mumbai (ap-mumbai)',
					value: 'ap-mumbai',
				},
				{
					name: 'Frankfurt (eu-frankfurt)',
					value: 'eu-frankfurt',
				},
				{
					name: 'Moscow (eu-moscow)',
					value: 'eu-moscow',
				},
				{
					name: 'Virginia (na-ashburn)',
					value: 'na-ashburn',
				},
				{
					name: 'Silicon Valley (na-siliconvalley)',
					value: 'na-siliconvalley',
				},
			],
			default: 'ap-beijing',
			required: true,
			description: '腾讯云服务地域',
		},
	];
}

// 默认导出
export default TencentCloudOCRGeneralApi;
