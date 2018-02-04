
/** 平台数据类型 */
class DataType
{
    /** 布尔型 */
    public static BOOLEAN = "f7036b21e6e34919b504df2cfc2d88e2@Value";
    
    /** 整型 */
    public static INTEGER = "346df36bea7945e5a1a395eb476e6607@Value";
    
    /** 大整型 */
    public static BIGINT = "b1c68b04908b4982bfd4280cd5b93e77@Value";
    
    /** 单精度浮点型 */
    public static FLOAT = "cecae31853204b39a6c2569632346a1b@Value";
    
    /** 双精度浮点型 */
    public static DOUBLE = "8c561fdc3d774ec387a597143dbd1ad5@Value";
    
    /** 数值型 */
    public static DECIMAL = "a862c03d5cdf4355b5d3a438c81cfbfe@Value";
    
    /** 日期时间型 */
    public static DATETIME = "229104957d384e72aa32ba288658dd3a@Value";
    
    /** 日期型 */
    public static DATE = "462e7094194d4f15828ca2e1de2f552b@Value";
    
    /** 时间型 */
    public static TIME = "ad87c1ec981045bd931d4fcf937697bd@Value";
    
    /** 字符串 */
    public static STRING = "0ce934524195428aa506260b0f97baf0@Value";
    
    /** 文本 */
    public static TEXT = "bbf35797f1124a6a89e9111e2ffde111@Value";
    
    /** 二进制型 */
    public static BINARY = "867da97346bc4eb5b802ed6b8b3b54cc@Value";
    
    /** 对象型 */
    public static OBJEKT = "c80693211fc4426a88ebca05b34a5f2d@Value";
    
    /** 列表型 */
    public static LIST = "ab097f34fd9d4b7ca216084e6386b99e@Value";
    
    /** 序列型 */
    public static SEQUENCE = "6926c35fec59420c8fcac25e7e97ecd0@Value";
    
    /** 密文串 */
    public static MD5 = "21ea616a571240b491653e13973dd83f@Value";
}

/** 平台属性名 */
class PropertyNames{
    /** ID */
    public static id = "id";

    /** 组合标签 */
    public static combinedLabel = "combinedLabel";
}

/** 组件事件名称 */
class EventNames{
    public static AfterSave = "AfterSave";
    public static AjaxError = "AjaxError";
    public static EditStateChange = "EditStateChange";
    public static ObjectsSelectedChange = "ObjectsSelectedChange";
    public static Save = "Save";
    public static SaveSucceeded = "SaveSucceeded";
    public static ValueChange = "ValueChange";
    public static Create = "Create";
    public static Submit = "Submit";

    public static InitLoad = "InitLoad";
    public static BeforeInit = "BeforeInit";
    public static AfterInit = "AfterInit";
    public static AfterCreate = "AfterCreate";
    public static AfterConnect = "AfterConnect";
    public static AfterDisconnect = "AfterDisconnect";
    public static AfterAdopt = "AfterAdopt";
    public static AfterAttributeChange = "AfterAttributeChange";
    public static AfterRefresh = "AfterRefresh";

    public static BeforeClose = "BeforeClose";
    public static Close = "Close";
    public static Open = "Open";

    public static TabLoad = "TabLoad";
    public static TabPanelLoad = "TabPanelLoad";
    public static TabSelect = "TabSelect";

    public static NodeClick = "NodeClick";

    public static UploadBeforeSend = "UploadBeforeSend";

    public static BeforeShow = "BeforeShow";
    public static AfterShow = "AfterShow";

    public static Maximize = "Maximize";
    public static Restore = "Restore";
    public static ToolbarCommand = "ToolbarCommand";
    public static ToolbarCommandSuccess = "ToolbarCommandSuccess";
    public static CheckToShow= "CheckToShow";
    public static AddRow = "AddRow";
    public static LoadSuccess = "LoadSuccess";
}

/** 查询条件操作符 */
class OperationTag{

    /** 等于 */
    public static Equals = "=";

    /** 不等于 */
    public static NotEquals = "!=";

    /** 为空 */
    public static IsNull = "N";

    /** 不为空 */
    public static IsNotNull = "!N";

    /** 大于 */
    public static Greater = ">";

    /** 大于等于 */
    public static GreaterOrEquals = ">=";

    /** 小于 */
    public static Less = "<";

    /** 小于等于 */
    public static LessOrEquals = "<=";

    /** 介于（含两端） */
    public static Between = "[..]";

    /** 介于（不含两端） */
    public static BetweenInner = "(..)";

    /** 包含 */
    public static Contains = "*";

    /** 不包含 */
    public static NotContains = "!*";

    /** 开始于 */
    public static BeginWith = "=*";

    /** 结束于 */
    public static EndWith = "*=";

    /** 存在于 */
    public static In = "In";

}

class IDs{
   public static DirectoryFileTypeID = "d072ec72d0f245e3b80e577c9f0dbfcf@FileType";
}