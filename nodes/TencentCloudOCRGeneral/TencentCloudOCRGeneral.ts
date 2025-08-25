import * as tencentcloud from "tencentcloud-sdk-nodejs";
import * as fs from "fs";

export class TencentCloudOCRGeneral {
	private client: any;

	constructor(secretId: string, secretKey: string, region: string = "ap-beijing") {
		// 初始化OCR客户端
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

	/**
	 * 通用文字识别（高精度版）
	 */
	async generalAccurateOCR(image: string | Buffer, options: any = {}) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image),
				...options
			};

			const result = await this.client.GeneralAccurateOCR(params);
			return this.formatGeneralResult(result);
		} catch (error: any) {
			throw new Error(`通用文字识别失败: ${error.message}`);
		}
	}

	/**
	 * 通用文字识别（标准版）
	 */
	async generalBasicOCR(image: string | Buffer, options: any = {}) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image),
				...options
			};

			const result = await this.client.GeneralBasicOCR(params);
			return this.formatGeneralResult(result);
		} catch (error: any) {
			throw new Error(`通用文字识别失败: ${error.message}`);
		}
	}

	/**
	 * 通用文字识别（含位置信息版）
	 */
	async generalOCR(image: string | Buffer, options: any = {}) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image),
				...options
			};

			const result = await this.client.GeneralOCR(params);
			return this.formatGeneralResult(result);
		} catch (error: any) {
			throw new Error(`通用文字识别失败: ${error.message}`);
		}
	}

	/**
	 * 手写文字识别
	 */
	async handwritingOCR(image: string | Buffer, options: any = {}) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image),
				...options
			};

			const result = await this.client.HandwritingOCR(params);
			return this.formatHandwritingResult(result);
		} catch (error: any) {
			throw new Error(`手写文字识别失败: ${error.message}`);
		}
	}

	/**
	 * 表格识别
	 */
	async tableOCR(image: string | Buffer, options: any = {}) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image),
				...options
			};

			const result = await this.client.TableOCR(params);
			return this.formatTableResult(result);
		} catch (error: any) {
			throw new Error(`表格识别失败: ${error.message}`);
		}
	}

	/**
	 * 身份证识别
	 */
	async idCardOCR(image: string | Buffer, cardSide: string = "FRONT") {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image),
				CardSide: cardSide
			};

			const result = await this.client.IDCardOCR(params);
			return this.formatIdCardResult(result, cardSide);
		} catch (error: any) {
			throw new Error(`身份证识别失败: ${error.message}`);
		}
	}

	/**
	 * 银行卡识别
	 */
	async bankCardOCR(image: string | Buffer) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image)
			};

			const result = await this.client.BankCardOCR(params);
			return this.formatBankCardResult(result);
		} catch (error: any) {
			throw new Error(`银行卡识别失败: ${error.message}`);
		}
	}

	/**
	 * 驾驶证识别
	 */
	async driverLicenseOCR(image: string | Buffer) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image)
			};

			const result = await this.client.DriverLicenseOCR(params);
			return this.formatDriverLicenseResult(result);
		} catch (error: any) {
			throw new Error(`驾驶证识别失败: ${error.message}`);
		}
	}

	/**
	 * 行驶证识别
	 */
	async vehicleLicenseOCR(image: string | Buffer) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image)
			};

			const result = await this.client.VehicleLicenseOCR(params);
			return this.formatVehicleLicenseResult(result);
		} catch (error: any) {
			throw new Error(`行驶证识别失败: ${error.message}`);
		}
	}

	/**
	 * 营业执照识别
	 */
	async businessLicenseOCR(image: string | Buffer) {
		try {
			const params = {
				ImageBase64: this.getImageBase64(image)
			};

			const result = await this.client.BusinessLicenseOCR(params);
			return this.formatBusinessLicenseResult(result);
		} catch (error: any) {
			throw new Error(`营业执照识别失败: ${error.message}`);
		}
	}

	/**
	 * 获取图片的Base64编码
	 */
	private getImageBase64(image: string | Buffer): string {
		if (Buffer.isBuffer(image)) {
			return image.toString('base64');
		} else if (typeof image === 'string') {
			if (fs.existsSync(image)) {
				const imageBuffer = fs.readFileSync(image);
				return imageBuffer.toString('base64');
			} else {
				throw new Error(`图片文件不存在: ${image}`);
			}
		} else {
			throw new Error('图片参数必须是文件路径或Buffer');
		}
	}

	/**
	 * 格式化通用文字识别结果
	 */
	private formatGeneralResult(result: any) {
		if (!result || !result.TextDetections) {
			return { text: '', items: [] };
		}

		const items = result.TextDetections.map((item: any) => ({
			text: item.DetectedText,
			confidence: item.Confidence,
			polygon: item.ItemPolygon ? item.ItemPolygon.Coords.map((coord: any) => ({
				x: coord.X,
				y: coord.Y
			})) : [],
			advancedInfo: item.AdvancedInfo || {}
		}));

		const fullText = items.map((item: any) => item.text).join('\n');

		return {
			text: fullText,
			items: items,
			totalCount: items.length,
			requestId: result.RequestId
		};
	}

	/**
	 * 格式化手写文字识别结果
	 */
	private formatHandwritingResult(result: any) {
		if (!result || !result.TextDetections) {
			return { text: '', items: [] };
		}

		const items = result.TextDetections.map((item: any) => ({
			text: item.DetectedText,
			confidence: item.Confidence,
			polygon: item.ItemPolygon ? item.ItemPolygon.Coords.map((coord: any) => ({
				x: coord.X,
				y: coord.Y
			})) : []
		}));

		const fullText = items.map((item: any) => item.text).join('\n');

		return {
			text: fullText,
			items: items,
			totalCount: items.length,
			requestId: result.RequestId
		};
	}

	/**
	 * 格式化表格识别结果
	 */
	private formatTableResult(result: any) {
		if (!result || !result.TableDetections) {
			return { tables: [] };
		}

		const tables = result.TableDetections.map((table: any) => ({
			tableId: table.TableId,
			confidence: table.Confidence,
			rows: table.Cells ? table.Cells.map((cell: any) => ({
				text: cell.Text,
				rowId: cell.RowId,
				colId: cell.ColId,
				confidence: cell.Confidence,
				polygon: cell.Polygon ? cell.Polygon.Coords.map((coord: any) => ({
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

	/**
	 * 格式化身份证识别结果
	 */
	private formatIdCardResult(result: any, cardSide: string) {
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

	/**
	 * 格式化银行卡识别结果
	 */
	private formatBankCardResult(result: any) {
		if (!result) {
			return { fields: {} };
		}

		return {
			fields: {
				bankName: result.BankInfo?.BankName,
				bankType: result.BankInfo?.BankType,
				cardNumber: result.CardNumber,
				validDate: result.ValidDate
			},
			confidence: result.Confidence,
			requestId: result.RequestId
		};
	}

	/**
	 * 格式化驾驶证识别结果
	 */
	private formatDriverLicenseResult(result: any) {
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

	/**
	 * 格式化行驶证识别结果
	 */
	private formatVehicleLicenseResult(result: any) {
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

	/**
	 * 格式化营业执照识别结果
	 */
	private formatBusinessLicenseResult(result: any) {
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
