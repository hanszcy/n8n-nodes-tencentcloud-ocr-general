"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TencentCloudOCRGeneralNode = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const TencentCloudOCRGeneral_1 = require("./TencentCloudOCRGeneral");
class TencentCloudOCRGeneralNode {
    constructor() {
        this.description = {
            displayName: 'Tencent Cloud OCR General',
            name: 'tencentCloudOCRGeneral',
            icon: 'file:tencentcloud.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: '腾讯云OCR通用文字识别',
            defaults: {
                name: 'Tencent Cloud OCR General',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'tencentCloudOCRGeneralApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://ocr.tencentcloudapi.com',
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    options: [
                        {
                            name: 'OCR Recognition',
                            value: 'ocr',
                        },
                    ],
                    default: 'ocr',
                    noDataExpression: true,
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['ocr'],
                        },
                    },
                    options: [
                        {
                            name: 'General Accurate OCR',
                            value: 'generalAccurate',
                            description: '通用文字识别（高精度版）',
                            action: 'Perform general accurate OCR',
                        },
                        {
                            name: 'General Basic OCR',
                            value: 'generalBasic',
                            description: '通用文字识别（标准版）',
                            action: 'Perform general basic OCR',
                        },
                        {
                            name: 'General OCR',
                            value: 'general',
                            description: '通用文字识别（含位置信息版）',
                            action: 'Perform general OCR',
                        },
                        {
                            name: 'Handwriting OCR',
                            value: 'handwriting',
                            description: '手写文字识别',
                            action: 'Perform handwriting OCR',
                        },
                        {
                            name: 'Table OCR',
                            value: 'table',
                            description: '表格识别',
                            action: 'Perform table OCR',
                        },
                        {
                            name: 'ID Card OCR',
                            value: 'idCard',
                            description: '身份证识别',
                            action: 'Perform ID card OCR',
                        },
                        {
                            name: 'Bank Card OCR',
                            value: 'bankCard',
                            description: '银行卡识别',
                            action: 'Perform bank card OCR',
                        },
                        {
                            name: 'Driver License OCR',
                            value: 'driverLicense',
                            description: '驾驶证识别',
                            action: 'Perform driver license OCR',
                        },
                        {
                            name: 'Vehicle License OCR',
                            value: 'vehicleLicense',
                            description: '行驶证识别',
                            action: 'Perform vehicle license OCR',
                        },
                        {
                            name: 'Business License OCR',
                            value: 'businessLicense',
                            description: '营业执照识别',
                            action: 'Perform business license OCR',
                        },
                    ],
                    default: 'generalAccurate',
                    noDataExpression: true,
                },
                {
                    displayName: 'Image',
                    name: 'image',
                    type: 'string',
                    default: '',
                    displayOptions: {
                        show: {
                            resource: ['ocr'],
                        },
                    },
                    description: '图片路径或Base64编码',
                    required: true,
                },
                {
                    displayName: 'Card Side',
                    name: 'cardSide',
                    type: 'options',
                    options: [
                        {
                            name: 'Front',
                            value: 'FRONT',
                        },
                        {
                            name: 'Back',
                            value: 'BACK',
                        },
                    ],
                    default: 'FRONT',
                    displayOptions: {
                        show: {
                            resource: ['ocr'],
                            operation: ['idCard'],
                        },
                    },
                    description: '身份证正反面',
                },
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: {
                        show: {
                            resource: ['ocr'],
                            operation: ['generalAccurate', 'generalBasic', 'general', 'handwriting', 'table'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Language Type',
                            name: 'languageType',
                            type: 'options',
                            options: [
                                {
                                    name: 'Auto',
                                    value: 'auto',
                                },
                                {
                                    name: 'Chinese',
                                    value: 'zh',
                                },
                                {
                                    name: 'English',
                                    value: 'en',
                                },
                            ],
                            default: 'auto',
                            description: '识别语言类型',
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        let ocr;
        for (let i = 0; i < items.length; i++) {
            try {
                const credentials = await this.getCredentials('tencentCloudOCRGeneralApi');
                ocr = new TencentCloudOCRGeneral_1.TencentCloudOCRGeneral(credentials.secretId, credentials.secretKey, credentials.region);
                const image = this.getNodeParameter('image', i);
                const additionalFields = this.getNodeParameter('additionalFields', i);
                let result;
                switch (operation) {
                    case 'generalAccurate':
                        result = await ocr.generalAccurateOCR(image, additionalFields);
                        break;
                    case 'generalBasic':
                        result = await ocr.generalBasicOCR(image, additionalFields);
                        break;
                    case 'general':
                        result = await ocr.generalOCR(image, additionalFields);
                        break;
                    case 'handwriting':
                        result = await ocr.handwritingOCR(image, additionalFields);
                        break;
                    case 'table':
                        result = await ocr.tableOCR(image, additionalFields);
                        break;
                    case 'idCard':
                        const cardSide = this.getNodeParameter('cardSide', i);
                        result = await ocr.idCardOCR(image, cardSide);
                        break;
                    case 'bankCard':
                        result = await ocr.bankCardOCR(image);
                        break;
                    case 'driverLicense':
                        result = await ocr.driverLicenseOCR(image);
                        break;
                    case 'vehicleLicense':
                        result = await ocr.vehicleLicenseOCR(image);
                        break;
                    case 'businessLicense':
                        result = await ocr.businessLicenseOCR(image);
                        break;
                    default:
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The operation "${operation}" is not supported!`);
                }
                const executionData = this.helpers.returnJsonArray(result);
                returnData.push(...executionData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    const executionData = this.helpers.returnJsonArray({
                        error: error instanceof Error ? error.message : String(error)
                    });
                    returnData.push(...executionData);
                    continue;
                }
                throw error;
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.TencentCloudOCRGeneralNode = TencentCloudOCRGeneralNode;
//# sourceMappingURL=TencentCloudOCRGeneral.node.js.map