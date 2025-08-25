"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TencentCloudOCRGeneral = void 0;
const tencentcloud = __importStar(require("tencentcloud-sdk-nodejs"));
const fs = __importStar(require("fs"));
class TencentCloudOCRGeneral {
    constructor(secretId, secretKey, region = "ap-beijing") {
        const OcrClient = tencentcloud.ocr.v20181119.Client;
        this.client = new OcrClient({
            credential: {
                secretId: secretId,
                secretKey: secretKey,
            },
            region: region,
            profile: {
                httpProfile: {
                    endpoint: "ocr.tencentcloudapi.com",
                },
            },
        });
    }
    async generalAccurateOCR(image, options = {}) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image),
                ...options
            };
            const result = await this.client.GeneralAccurateOCR(params);
            return this.formatGeneralResult(result);
        }
        catch (error) {
            throw new Error(`通用文字识别失败: ${error.message}`);
        }
    }
    async generalBasicOCR(image, options = {}) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image),
                ...options
            };
            const result = await this.client.GeneralBasicOCR(params);
            return this.formatGeneralResult(result);
        }
        catch (error) {
            throw new Error(`通用文字识别失败: ${error.message}`);
        }
    }
    async generalOCR(image, options = {}) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image),
                ...options
            };
            const result = await this.client.GeneralOCR(params);
            return this.formatGeneralResult(result);
        }
        catch (error) {
            throw new Error(`通用文字识别失败: ${error.message}`);
        }
    }
    async handwritingOCR(image, options = {}) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image),
                ...options
            };
            const result = await this.client.HandwritingOCR(params);
            return this.formatHandwritingResult(result);
        }
        catch (error) {
            throw new Error(`手写文字识别失败: ${error.message}`);
        }
    }
    async tableOCR(image, options = {}) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image),
                ...options
            };
            const result = await this.client.TableOCR(params);
            return this.formatTableResult(result);
        }
        catch (error) {
            throw new Error(`表格识别失败: ${error.message}`);
        }
    }
    async idCardOCR(image, cardSide = "FRONT") {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image),
                CardSide: cardSide
            };
            const result = await this.client.IDCardOCR(params);
            return this.formatIdCardResult(result, cardSide);
        }
        catch (error) {
            throw new Error(`身份证识别失败: ${error.message}`);
        }
    }
    async bankCardOCR(image) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image)
            };
            const result = await this.client.BankCardOCR(params);
            return this.formatBankCardResult(result);
        }
        catch (error) {
            throw new Error(`银行卡识别失败: ${error.message}`);
        }
    }
    async driverLicenseOCR(image) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image)
            };
            const result = await this.client.DriverLicenseOCR(params);
            return this.formatDriverLicenseResult(result);
        }
        catch (error) {
            throw new Error(`驾驶证识别失败: ${error.message}`);
        }
    }
    async vehicleLicenseOCR(image) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image)
            };
            const result = await this.client.VehicleLicenseOCR(params);
            return this.formatVehicleLicenseResult(result);
        }
        catch (error) {
            throw new Error(`行驶证识别失败: ${error.message}`);
        }
    }
    async businessLicenseOCR(image) {
        try {
            const params = {
                ImageBase64: this.getImageBase64(image)
            };
            const result = await this.client.BusinessLicenseOCR(params);
            return this.formatBusinessLicenseResult(result);
        }
        catch (error) {
            throw new Error(`营业执照识别失败: ${error.message}`);
        }
    }
    getImageBase64(image) {
        if (Buffer.isBuffer(image)) {
            return image.toString('base64');
        }
        else if (typeof image === 'string') {
            if (fs.existsSync(image)) {
                const imageBuffer = fs.readFileSync(image);
                return imageBuffer.toString('base64');
            }
            else {
                throw new Error(`图片文件不存在: ${image}`);
            }
        }
        else {
            throw new Error('图片参数必须是文件路径或Buffer');
        }
    }
    formatGeneralResult(result) {
        if (!result || !result.TextDetections) {
            return { text: '', items: [] };
        }
        const items = result.TextDetections.map((item) => ({
            text: item.DetectedText,
            confidence: item.Confidence,
            polygon: item.ItemPolygon ? item.ItemPolygon.Coords.map((coord) => ({
                x: coord.X,
                y: coord.Y
            })) : [],
            advancedInfo: item.AdvancedInfo || {}
        }));
        const fullText = items.map((item) => item.text).join('\n');
        return {
            text: fullText,
            items: items,
            totalCount: items.length,
            requestId: result.RequestId
        };
    }
    formatHandwritingResult(result) {
        if (!result || !result.TextDetections) {
            return { text: '', items: [] };
        }
        const items = result.TextDetections.map((item) => ({
            text: item.DetectedText,
            confidence: item.Confidence,
            polygon: item.ItemPolygon ? item.ItemPolygon.Coords.map((coord) => ({
                x: coord.X,
                y: coord.Y
            })) : []
        }));
        const fullText = items.map((item) => item.text).join('\n');
        return {
            text: fullText,
            items: items,
            totalCount: items.length,
            requestId: result.RequestId
        };
    }
    formatTableResult(result) {
        if (!result || !result.TableDetections) {
            return { tables: [] };
        }
        const tables = result.TableDetections.map((table) => ({
            tableId: table.TableId,
            confidence: table.Confidence,
            rows: table.Cells ? table.Cells.map((cell) => ({
                text: cell.Text,
                rowId: cell.RowId,
                colId: cell.ColId,
                confidence: cell.Confidence,
                polygon: cell.Polygon ? cell.Polygon.Coords.map((coord) => ({
                    x: coord.X,
                    y: coord.Y
                })) : []
            })) : []
        }));
        return {
            tables: tables,
            totalCount: tables.length,
            requestId: result.RequestId
        };
    }
    formatIdCardResult(result, cardSide) {
        if (!result) {
            return { cardSide, fields: {} };
        }
        const fields = cardSide === "FRONT" ? {
            name: result.Name,
            sex: result.Sex,
            nation: result.Nation,
            birth: result.Birth,
            address: result.Address,
            idCard: result.IdCard
        } : {
            authority: result.Authority,
            validDate: result.ValidDate
        };
        return {
            cardSide,
            fields,
            confidence: result.Confidence,
            requestId: result.RequestId
        };
    }
    formatBankCardResult(result) {
        var _a, _b;
        if (!result) {
            return { fields: {} };
        }
        return {
            fields: {
                bankName: (_a = result.BankInfo) === null || _a === void 0 ? void 0 : _a.BankName,
                bankType: (_b = result.BankInfo) === null || _b === void 0 ? void 0 : _b.BankType,
                cardNumber: result.CardNumber,
                validDate: result.ValidDate
            },
            confidence: result.Confidence,
            requestId: result.RequestId
        };
    }
    formatDriverLicenseResult(result) {
        if (!result) {
            return { fields: {} };
        }
        return {
            fields: {
                name: result.Name,
                sex: result.Sex,
                nationality: result.Nationality,
                address: result.Address,
                dateOfBirth: result.DateOfBirth,
                dateOfFirstIssue: result.DateOfFirstIssue,
                class: result.Class,
                validFrom: result.ValidFrom,
                validFor: result.ValidFor,
                licenseNumber: result.LicenseNumber
            },
            confidence: result.Confidence,
            requestId: result.RequestId
        };
    }
    formatVehicleLicenseResult(result) {
        if (!result) {
            return { fields: {} };
        }
        return {
            fields: {
                plateNumber: result.PlateNumber,
                vehicleType: result.VehicleType,
                owner: result.Owner,
                address: result.Address,
                useCharacter: result.UseCharacter,
                model: result.Model,
                vin: result.VIN,
                engineNumber: result.EngineNumber,
                registerDate: result.RegisterDate,
                issueDate: result.IssueDate,
                seal: result.Seal
            },
            confidence: result.Confidence,
            requestId: result.RequestId
        };
    }
    formatBusinessLicenseResult(result) {
        if (!result) {
            return { fields: {} };
        }
        return {
            fields: {
                companyName: result.CompanyName,
                legalPerson: result.LegalPerson,
                address: result.Address,
                businessScope: result.BusinessScope,
                businessType: result.BusinessType,
                registeredCapital: result.RegisteredCapital,
                paidInCapital: result.PaidInCapital,
                businessTerm: result.BusinessTerm,
                registrationDate: result.RegistrationDate,
                businessLicenseNumber: result.BusinessLicenseNumber
            },
            confidence: result.Confidence,
            requestId: result.RequestId
        };
    }
}
exports.TencentCloudOCRGeneral = TencentCloudOCRGeneral;
//# sourceMappingURL=TencentCloudOCRGeneral.js.map