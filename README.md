# n8n-nodes-tencentcloud-ocr-general

腾讯云OCR通用文字识别节点，支持多种文档类型识别。

## 功能特性

- **通用文字识别**：支持高精度版、标准版、含位置信息版
- **手写文字识别**：专门识别手写文字内容
- **表格识别**：识别表格结构并提取单元格内容
- **证件识别**：身份证、银行卡、驾驶证、行驶证、营业执照等
- **多语言支持**：支持中文、英文等多种语言
- **批量处理**：支持多图片批量识别

## 安装

在n8n中，你可以通过以下方式安装：

1. **通过n8n界面安装**：
   - 在n8n中，转到 Settings > Community Nodes
   - 点击 "Install Community Node"
   - 输入包名：`n8n-nodes-tencentcloud-ocr-general`

2. **通过npm安装**：
   ```bash
   npm install n8n-nodes-tencentcloud-ocr-general
   ```

## 配置

在使用前，你需要配置腾讯云的访问密钥：

1. 登录腾讯云控制台
2. 获取你的 `SecretId` 和 `SecretKey`
3. 在n8n中创建新的凭证，选择 "Tencent Cloud OCR General API"
4. 填入你的密钥信息

## 使用方法

### 1. 通用文字识别（高精度版）

这是最常用的识别方式，适合大多数文档：

- **Resource**: OCR Recognition
- **Operation**: General Accurate OCR
- **Image**: 图片路径或Base64编码
- **Additional Fields**: 可选的语言类型设置

### 2. 手写文字识别

专门用于识别手写内容：

- **Resource**: OCR Recognition
- **Operation**: Handwriting OCR
- **Image**: 图片路径或Base64编码

### 3. 表格识别

识别表格结构并提取数据：

- **Resource**: OCR Recognition
- **Operation**: Table OCR
- **Image**: 图片路径或Base64编码

### 4. 证件识别

支持多种证件类型：

- **身份证识别**：选择 ID Card OCR，指定正反面
- **银行卡识别**：选择 Bank Card OCR
- **驾驶证识别**：选择 Driver License OCR
- **行驶证识别**：选择 Vehicle License OCR
- **营业执照识别**：选择 Business License OCR

## 输入参数

### 必需参数

- **Image**: 要识别的图片，支持文件路径或Base64编码

### 可选参数

- **Card Side**: 身份证识别时选择正反面（FRONT/BACK）
- **Language Type**: 识别语言类型（auto/zh/en）

## 输出格式

### 通用文字识别结果

```json
{
  "text": "完整的识别文本",
  "items": [
    {
      "text": "单个文字块",
      "confidence": 99.5,
      "polygon": [
        {"x": 100, "y": 200},
        {"x": 150, "y": 200},
        {"x": 150, "y": 220},
        {"x": 100, "y": 220}
      ]
    }
  ],
  "totalCount": 1,
  "requestId": "请求ID"
}
```

### 表格识别结果

```json
{
  "tables": [
    {
      "tableId": "表格ID",
      "confidence": 99.5,
      "rows": [
        {
          "text": "单元格内容",
          "rowId": 1,
          "colId": 1,
          "confidence": 99.5
        }
      ]
    }
  ],
  "totalCount": 1,
  "requestId": "请求ID"
}
```

### 证件识别结果

```json
{
  "fields": {
    "name": "姓名",
    "idCard": "身份证号"
  },
  "confidence": 99.5,
  "requestId": "请求ID"
}
```

## 使用场景

1. **文档数字化**：将纸质文档转换为可编辑的文本
2. **信息提取**：从图片中提取关键信息
3. **数据录入**：自动化数据录入流程
4. **内容审核**：识别图片中的文字内容进行审核
5. **证件验证**：自动识别和验证各种证件信息

## 支持的图片格式

- JPEG/JPG
- PNG
- BMP
- GIF（仅第一帧）
- TIFF

## 图片要求

- 图片大小：不超过10MB
- 图片分辨率：建议不超过4096×4096像素
- 图片质量：清晰度越高，识别效果越好

## 注意事项

1. **API限制**：注意腾讯云OCR的API调用频率和次数限制
2. **图片质量**：图片质量直接影响识别准确率
3. **隐私安全**：请妥善保管你的访问密钥
4. **费用说明**：使用腾讯云OCR服务会产生相应费用

## 与原始发票识别节点的区别

原始的 `n8n-nodes-tencentcloud-ocr` 包主要专注于发票识别，而这个通用节点提供了更全面的OCR功能：

- **通用性**：支持多种文档类型，不限于发票
- **灵活性**：提供多种识别模式，满足不同需求
- **易用性**：统一的接口设计，便于集成到工作流中
- **扩展性**：易于添加新的识别类型和功能

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个节点。

## 相关链接

- [腾讯云OCR官方文档](https://cloud.tencent.com/document/product/866)
- [腾讯云Node.js SDK](https://github.com/TencentCloud/tencentcloud-sdk-nodejs)
- [n8n官方文档](https://docs.n8n.io/)
- [原始发票识别节点](https://www.npmjs.com/package/n8n-nodes-tencentcloud-ocr)
