import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Definition of the AWS::QuickSight::Analysis Resource Type.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-analysis.html}
 */
export type QuickSightAnalysisProperties = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  AnalysisId: string;
  /**
   * @minLength `12`
   * @maxLength `12`
   * @pattern `^[0-9]{12}$`
   */
  AwsAccountId: string;
  Definition?: AnalysisDefinition;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Name: string;
  Parameters?: Parameters;
  /**
   * @minLength `1`
   * @maxLength `64`
   */
  Permissions?: ResourcePermission[];
  SourceEntity?: AnalysisSourceEntity;
  Status?: ResourceStatus;
  /**
   * @minLength `1`
   * @maxLength `200`
   */
  Tags?: Tag[];
  ThemeArn?: string;
  ValidationStrategy?: ValidationStrategy;
};
/**
 * Attribute type definition for `AWS::QuickSight::Analysis`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-analysis.html#aws-resource-quicksight-analysis-return-values}
 */
export type QuickSightAnalysisAttributes = {
  Arn: string;
  CreatedTime: string;
  /**
   * @maxLength `100`
   */
  DataSetArns: string[];
  /**
   * @minLength `1`
   */
  Errors: AnalysisError[];
  LastUpdatedTime: string;
  /**
   * @maxLength `20`
   */
  Sheets: Sheet[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-aggregationfunction.html}
 */
export type AggregationFunction = {
  AttributeAggregationFunction?: AttributeAggregationFunction;
  CategoricalAggregationFunction?: CategoricalAggregationFunction;
  DateAggregationFunction?: DateAggregationFunction;
  NumericalAggregationFunction?: NumericalAggregationFunction;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AggregationSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-aggregationsortconfiguration.html}
 */
export type AggregationSortConfiguration = {
  AggregationFunction?: AggregationFunction;
  Column: ColumnIdentifier;
  SortDirection: SortDirection;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AllSheetsFilterScopeConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-allsheetsfilterscopeconfiguration.html}
 */
export type AllSheetsFilterScopeConfiguration = Record<string, any>;
/**
 * Type definition for `AWS::QuickSight::Analysis.AnalysisDefaults`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-analysisdefaults.html}
 */
export type AnalysisDefaults = {
  DefaultNewSheetConfiguration: DefaultNewSheetConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AnalysisDefinition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-analysisdefinition.html}
 */
export type AnalysisDefinition = {
  AnalysisDefaults?: AnalysisDefaults;
  /**
   * @maxLength `500`
   */
  CalculatedFields?: CalculatedField[];
  /**
   * @maxLength `200`
   */
  ColumnConfigurations?: ColumnConfiguration[];
  /**
   * @minLength `1`
   * @maxLength `50`
   */
  DataSetIdentifierDeclarations: DataSetIdentifierDeclaration[];
  /**
   * @maxLength `2000`
   */
  FilterGroups?: FilterGroup[];
  Options?: AssetOptions;
  /**
   * @maxLength `200`
   */
  ParameterDeclarations?: ParameterDeclaration[];
  /**
   * @maxLength `20`
   */
  Sheets?: SheetDefinition[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AnalysisError`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-analysiserror.html}
 */
export type AnalysisError = {
  /**
   * @pattern `.*\S.*`
   */
  Message?: string;
  Type?: AnalysisErrorType;
  /**
   * @maxLength `200`
   */
  ViolatedEntities?: Entity[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AnalysisErrorType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-analysiserrortype.html}
 */
export type AnalysisErrorType =
  | "ACCESS_DENIED"
  | "SOURCE_NOT_FOUND"
  | "DATA_SET_NOT_FOUND"
  | "INTERNAL_FAILURE"
  | "PARAMETER_VALUE_INCOMPATIBLE"
  | "PARAMETER_TYPE_INVALID"
  | "PARAMETER_NOT_FOUND"
  | "COLUMN_TYPE_MISMATCH"
  | "COLUMN_GEOGRAPHIC_ROLE_MISMATCH"
  | "COLUMN_REPLACEMENT_MISSING";
/**
 * Type definition for `AWS::QuickSight::Analysis.AnalysisSourceEntity`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-analysissourceentity.html}
 */
export type AnalysisSourceEntity = {
  SourceTemplate?: AnalysisSourceTemplate;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AnalysisSourceTemplate`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-analysissourcetemplate.html}
 */
export type AnalysisSourceTemplate = {
  Arn: string;
  /**
   * @minLength `1`
   */
  DataSetReferences: DataSetReference[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AnchorDateConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-anchordateconfiguration.html}
 */
export type AnchorDateConfiguration = {
  AnchorOption?: AnchorOption;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  ParameterName?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AnchorOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-anchoroption.html}
 */
export type AnchorOption = "NOW";
/**
 * Type definition for `AWS::QuickSight::Analysis.ArcAxisConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-arcaxisconfiguration.html}
 */
export type ArcAxisConfiguration = {
  Range?: ArcAxisDisplayRange;
  ReserveRange?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ArcAxisDisplayRange`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-arcaxisdisplayrange.html}
 */
export type ArcAxisDisplayRange = {
  Max?: number;
  Min?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ArcConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-arcconfiguration.html}
 */
export type ArcConfiguration = {
  ArcAngle?: number;
  ArcThickness?: ArcThicknessOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ArcOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-arcoptions.html}
 */
export type ArcOptions = {
  ArcThickness?: ArcThickness;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ArcThickness`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-arcthickness.html}
 */
export type ArcThickness = "SMALL" | "MEDIUM" | "LARGE" | "WHOLE";
/**
 * Type definition for `AWS::QuickSight::Analysis.ArcThicknessOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-arcthicknessoptions.html}
 */
export type ArcThicknessOptions = "SMALL" | "MEDIUM" | "LARGE";
/**
 * Type definition for `AWS::QuickSight::Analysis.AssetOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-assetoptions.html}
 */
export type AssetOptions = {
  Timezone?: string;
  WeekStart?: DayOfTheWeek;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AttributeAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-attributeaggregationfunction.html}
 */
export type AttributeAggregationFunction = {
  SimpleAttributeAggregation?: SimpleAttributeAggregationFunction;
  ValueForMultipleValues?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisBinding`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisbinding.html}
 */
export type AxisBinding = "PRIMARY_YAXIS" | "SECONDARY_YAXIS";
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisDataOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisdataoptions.html}
 */
export type AxisDataOptions = {
  DateAxisOptions?: DateAxisOptions;
  NumericAxisOptions?: NumericAxisOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisDisplayDataDrivenRange`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisdisplaydatadrivenrange.html}
 */
export type AxisDisplayDataDrivenRange = Record<string, any>;
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisDisplayMinMaxRange`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisdisplayminmaxrange.html}
 */
export type AxisDisplayMinMaxRange = {
  Maximum?: number;
  Minimum?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisdisplayoptions.html}
 */
export type AxisDisplayOptions = {
  AxisLineVisibility?: Visibility;
  /**
   * String based length that is composed of value and unit in px
   */
  AxisOffset?: string;
  DataOptions?: AxisDataOptions;
  GridLineVisibility?: Visibility;
  ScrollbarOptions?: ScrollBarOptions;
  TickLabelOptions?: AxisTickLabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisDisplayRange`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisdisplayrange.html}
 */
export type AxisDisplayRange = {
  DataDriven?: AxisDisplayDataDrivenRange;
  MinMax?: AxisDisplayMinMaxRange;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axislabeloptions.html}
 */
export type AxisLabelOptions = {
  ApplyTo?: AxisLabelReferenceOptions;
  CustomLabel?: string;
  FontConfiguration?: FontConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisLabelReferenceOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axislabelreferenceoptions.html}
 */
export type AxisLabelReferenceOptions = {
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisLinearScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axislinearscale.html}
 */
export type AxisLinearScale = {
  StepCount?: number;
  StepSize?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisLogarithmicScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axislogarithmicscale.html}
 */
export type AxisLogarithmicScale = {
  Base?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisscale.html}
 */
export type AxisScale = {
  Linear?: AxisLinearScale;
  Logarithmic?: AxisLogarithmicScale;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.AxisTickLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-axisticklabeloptions.html}
 */
export type AxisTickLabelOptions = {
  LabelOptions?: LabelOptions;
  RotationAngle?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BarChartAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-barchartaggregatedfieldwells.html}
 */
export type BarChartAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Colors?: DimensionField[];
  /**
   * @maxLength `1`
   */
  SmallMultiples?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BarChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-barchartconfiguration.html}
 */
export type BarChartConfiguration = {
  BarsArrangement?: BarsArrangement;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  ColorLabelOptions?: ChartAxisLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `200`
   */
  ContributionAnalysisDefaults?: ContributionAnalysisDefault[];
  DataLabels?: DataLabelOptions;
  FieldWells?: BarChartFieldWells;
  Legend?: LegendOptions;
  Orientation?: BarChartOrientation;
  /**
   * @maxLength `20`
   */
  ReferenceLines?: ReferenceLine[];
  SmallMultiplesOptions?: SmallMultiplesOptions;
  SortConfiguration?: BarChartSortConfiguration;
  Tooltip?: TooltipOptions;
  ValueAxis?: AxisDisplayOptions;
  ValueLabelOptions?: ChartAxisLabelOptions;
  VisualPalette?: VisualPalette;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BarChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-barchartfieldwells.html}
 */
export type BarChartFieldWells = {
  BarChartAggregatedFieldWells?: BarChartAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BarChartOrientation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-barchartorientation.html}
 */
export type BarChartOrientation = "HORIZONTAL" | "VERTICAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.BarChartSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-barchartsortconfiguration.html}
 */
export type BarChartSortConfiguration = {
  CategoryItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
  ColorItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  ColorSort?: FieldSortOptions[];
  SmallMultiplesLimitConfiguration?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  SmallMultiplesSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BarChartVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-barchartvisual.html}
 */
export type BarChartVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: BarChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BarsArrangement`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-barsarrangement.html}
 */
export type BarsArrangement = "CLUSTERED" | "STACKED" | "STACKED_PERCENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.BaseMapStyleType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-basemapstyletype.html}
 */
export type BaseMapStyleType =
  | "LIGHT_GRAY"
  | "DARK_GRAY"
  | "STREET"
  | "IMAGERY";
/**
 * Type definition for `AWS::QuickSight::Analysis.BinCountOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-bincountoptions.html}
 */
export type BinCountOptions = {
  Value?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BinWidthOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-binwidthoptions.html}
 */
export type BinWidthOptions = {
  /**
   * @max `1000`
   */
  BinCountLimit?: number;
  Value?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BodySectionConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-bodysectionconfiguration.html}
 */
export type BodySectionConfiguration = {
  Content: BodySectionContent;
  PageBreakConfiguration?: SectionPageBreakConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SectionId: string;
  Style?: SectionStyle;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BodySectionContent`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-bodysectioncontent.html}
 */
export type BodySectionContent = {
  Layout?: SectionLayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotaggregatedfieldwells.html}
 */
export type BoxPlotAggregatedFieldWells = {
  /**
   * @maxLength `1`
   */
  GroupBy?: DimensionField[];
  /**
   * @maxLength `5`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotchartconfiguration.html}
 */
export type BoxPlotChartConfiguration = {
  BoxPlotOptions?: BoxPlotOptions;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  FieldWells?: BoxPlotFieldWells;
  Legend?: LegendOptions;
  PrimaryYAxisDisplayOptions?: AxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  /**
   * @maxLength `20`
   */
  ReferenceLines?: ReferenceLine[];
  SortConfiguration?: BoxPlotSortConfiguration;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotfieldwells.html}
 */
export type BoxPlotFieldWells = {
  BoxPlotAggregatedFieldWells?: BoxPlotAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotFillStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotfillstyle.html}
 */
export type BoxPlotFillStyle = "SOLID" | "TRANSPARENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotoptions.html}
 */
export type BoxPlotOptions = {
  AllDataPointsVisibility?: Visibility;
  OutlierVisibility?: Visibility;
  StyleOptions?: BoxPlotStyleOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotsortconfiguration.html}
 */
export type BoxPlotSortConfiguration = {
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
  PaginationConfiguration?: PaginationConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotStyleOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotstyleoptions.html}
 */
export type BoxPlotStyleOptions = {
  FillStyle?: BoxPlotFillStyle;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.BoxPlotVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-boxplotvisual.html}
 */
export type BoxPlotVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: BoxPlotChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CalculatedField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-calculatedfield.html}
 */
export type CalculatedField = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  DataSetIdentifier: string;
  /**
   * @minLength `1`
   * @maxLength `32000`
   */
  Expression: string;
  /**
   * @minLength `1`
   * @maxLength `127`
   */
  Name: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CalculatedMeasureField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-calculatedmeasurefield.html}
 */
export type CalculatedMeasureField = {
  /**
   * @minLength `1`
   * @maxLength `4096`
   */
  Expression: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CascadingControlConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-cascadingcontrolconfiguration.html}
 */
export type CascadingControlConfiguration = {
  /**
   * @maxLength `200`
   */
  SourceControls?: CascadingControlSource[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CascadingControlSource`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-cascadingcontrolsource.html}
 */
export type CascadingControlSource = {
  ColumnToMatch?: ColumnIdentifier;
  SourceSheetControlId?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoricalAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categoricalaggregationfunction.html}
 */
export type CategoricalAggregationFunction = "COUNT" | "DISTINCT_COUNT";
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoricalDimensionField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categoricaldimensionfield.html}
 */
export type CategoricalDimensionField = {
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FormatConfiguration?: StringFormatConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  HierarchyId?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoricalMeasureField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categoricalmeasurefield.html}
 */
export type CategoricalMeasureField = {
  AggregationFunction?: CategoricalAggregationFunction;
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FormatConfiguration?: StringFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoryDrillDownFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categorydrilldownfilter.html}
 */
export type CategoryDrillDownFilter = {
  /**
   * @maxLength `100000`
   */
  CategoryValues: string[];
  Column: ColumnIdentifier;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoryFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categoryfilter.html}
 */
export type CategoryFilter = {
  Column: ColumnIdentifier;
  Configuration: CategoryFilterConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoryFilterConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categoryfilterconfiguration.html}
 */
export type CategoryFilterConfiguration = {
  CustomFilterConfiguration?: CustomFilterConfiguration;
  CustomFilterListConfiguration?: CustomFilterListConfiguration;
  FilterListConfiguration?: FilterListConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoryFilterMatchOperator`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categoryfiltermatchoperator.html}
 */
export type CategoryFilterMatchOperator =
  | "EQUALS"
  | "DOES_NOT_EQUAL"
  | "CONTAINS"
  | "DOES_NOT_CONTAIN"
  | "STARTS_WITH"
  | "ENDS_WITH";
/**
 * Type definition for `AWS::QuickSight::Analysis.CategoryFilterSelectAllOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-categoryfilterselectalloptions.html}
 */
export type CategoryFilterSelectAllOptions = "FILTER_ALL_VALUES";
/**
 * Type definition for `AWS::QuickSight::Analysis.ChartAxisLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-chartaxislabeloptions.html}
 */
export type ChartAxisLabelOptions = {
  /**
   * @maxLength `100`
   */
  AxisLabelOptions?: AxisLabelOptions[];
  SortIconVisibility?: Visibility;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ClusterMarker`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-clustermarker.html}
 */
export type ClusterMarker = {
  SimpleClusterMarker?: SimpleClusterMarker;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ClusterMarkerConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-clustermarkerconfiguration.html}
 */
export type ClusterMarkerConfiguration = {
  ClusterMarker?: ClusterMarker;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ColorFillType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-colorfilltype.html}
 */
export type ColorFillType = "DISCRETE" | "GRADIENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.ColorScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-colorscale.html}
 */
export type ColorScale = {
  ColorFillType: ColorFillType;
  /**
   * @minLength `2`
   * @maxLength `3`
   */
  Colors: DataColor[];
  NullValueColor?: DataColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ColorsConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-colorsconfiguration.html}
 */
export type ColorsConfiguration = {
  /**
   * @maxLength `50`
   */
  CustomColors?: CustomColor[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ColumnConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-columnconfiguration.html}
 */
export type ColumnConfiguration = {
  ColorsConfiguration?: ColorsConfiguration;
  Column: ColumnIdentifier;
  FormatConfiguration?: FormatConfiguration;
  Role?: ColumnRole;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ColumnHierarchy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-columnhierarchy.html}
 */
export type ColumnHierarchy = {
  DateTimeHierarchy?: DateTimeHierarchy;
  ExplicitHierarchy?: ExplicitHierarchy;
  PredefinedHierarchy?: PredefinedHierarchy;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ColumnIdentifier`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-columnidentifier.html}
 */
export type ColumnIdentifier = {
  /**
   * @minLength `1`
   * @maxLength `127`
   */
  ColumnName: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  DataSetIdentifier: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ColumnRole`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-columnrole.html}
 */
export type ColumnRole = "DIMENSION" | "MEASURE";
/**
 * Type definition for `AWS::QuickSight::Analysis.ColumnSort`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-columnsort.html}
 */
export type ColumnSort = {
  AggregationFunction?: AggregationFunction;
  Direction: SortDirection;
  SortBy: ColumnIdentifier;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ColumnTooltipItem`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-columntooltipitem.html}
 */
export type ColumnTooltipItem = {
  Aggregation?: AggregationFunction;
  Column: ColumnIdentifier;
  Label?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComboChartAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-combochartaggregatedfieldwells.html}
 */
export type ComboChartAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  BarValues?: MeasureField[];
  /**
   * @maxLength `200`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Colors?: DimensionField[];
  /**
   * @maxLength `200`
   */
  LineValues?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComboChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-combochartconfiguration.html}
 */
export type ComboChartConfiguration = {
  BarDataLabels?: DataLabelOptions;
  BarsArrangement?: BarsArrangement;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  ColorLabelOptions?: ChartAxisLabelOptions;
  FieldWells?: ComboChartFieldWells;
  Legend?: LegendOptions;
  LineDataLabels?: DataLabelOptions;
  PrimaryYAxisDisplayOptions?: AxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  /**
   * @maxLength `20`
   */
  ReferenceLines?: ReferenceLine[];
  SecondaryYAxisDisplayOptions?: AxisDisplayOptions;
  SecondaryYAxisLabelOptions?: ChartAxisLabelOptions;
  SortConfiguration?: ComboChartSortConfiguration;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComboChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-combochartfieldwells.html}
 */
export type ComboChartFieldWells = {
  ComboChartAggregatedFieldWells?: ComboChartAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComboChartSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-combochartsortconfiguration.html}
 */
export type ComboChartSortConfiguration = {
  CategoryItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
  ColorItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  ColorSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComboChartVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-combochartvisual.html}
 */
export type ComboChartVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: ComboChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComparisonConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-comparisonconfiguration.html}
 */
export type ComparisonConfiguration = {
  ComparisonFormat?: ComparisonFormatConfiguration;
  ComparisonMethod?: ComparisonMethod;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComparisonFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-comparisonformatconfiguration.html}
 */
export type ComparisonFormatConfiguration = {
  NumberDisplayFormatConfiguration?: NumberDisplayFormatConfiguration;
  PercentageDisplayFormatConfiguration?: PercentageDisplayFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ComparisonMethod`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-comparisonmethod.html}
 */
export type ComparisonMethod = "DIFFERENCE" | "PERCENT_DIFFERENCE" | "PERCENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.Computation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-computation.html}
 */
export type Computation = {
  Forecast?: ForecastComputation;
  GrowthRate?: GrowthRateComputation;
  MaximumMinimum?: MaximumMinimumComputation;
  MetricComparison?: MetricComparisonComputation;
  PeriodOverPeriod?: PeriodOverPeriodComputation;
  PeriodToDate?: PeriodToDateComputation;
  TopBottomMovers?: TopBottomMoversComputation;
  TopBottomRanked?: TopBottomRankedComputation;
  TotalAggregation?: TotalAggregationComputation;
  UniqueValues?: UniqueValuesComputation;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingcolor.html}
 */
export type ConditionalFormattingColor = {
  Gradient?: ConditionalFormattingGradientColor;
  Solid?: ConditionalFormattingSolidColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingCustomIconCondition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingcustomiconcondition.html}
 */
export type ConditionalFormattingCustomIconCondition = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
  DisplayConfiguration?: ConditionalFormattingIconDisplayConfiguration;
  /**
   * @minLength `1`
   * @maxLength `4096`
   */
  Expression: string;
  IconOptions: ConditionalFormattingCustomIconOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingCustomIconOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingcustomiconoptions.html}
 */
export type ConditionalFormattingCustomIconOptions = {
  Icon?: Icon;
  /**
   * @pattern `^[^\u0000-\u00FF]$`
   */
  UnicodeIcon?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingGradientColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattinggradientcolor.html}
 */
export type ConditionalFormattingGradientColor = {
  Color: GradientColor;
  /**
   * @minLength `1`
   * @maxLength `4096`
   */
  Expression: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingIcon`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingicon.html}
 */
export type ConditionalFormattingIcon = {
  CustomCondition?: ConditionalFormattingCustomIconCondition;
  IconSet?: ConditionalFormattingIconSet;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingIconDisplayConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingicondisplayconfiguration.html}
 */
export type ConditionalFormattingIconDisplayConfiguration = {
  IconDisplayOption?: ConditionalFormattingIconDisplayOption;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingIconDisplayOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingicondisplayoption.html}
 */
export type ConditionalFormattingIconDisplayOption = "ICON_ONLY";
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingIconSet`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingiconset.html}
 */
export type ConditionalFormattingIconSet = {
  /**
   * @minLength `1`
   * @maxLength `4096`
   */
  Expression: string;
  IconSetType?: ConditionalFormattingIconSetType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingIconSetType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingiconsettype.html}
 */
export type ConditionalFormattingIconSetType =
  | "PLUS_MINUS"
  | "CHECK_X"
  | "THREE_COLOR_ARROW"
  | "THREE_GRAY_ARROW"
  | "CARET_UP_MINUS_DOWN"
  | "THREE_SHAPE"
  | "THREE_CIRCLE"
  | "FLAGS"
  | "BARS"
  | "FOUR_COLOR_ARROW"
  | "FOUR_GRAY_ARROW";
/**
 * Type definition for `AWS::QuickSight::Analysis.ConditionalFormattingSolidColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-conditionalformattingsolidcolor.html}
 */
export type ConditionalFormattingSolidColor = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
  /**
   * @minLength `1`
   * @maxLength `4096`
   */
  Expression: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ContributionAnalysisDefault`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-contributionanalysisdefault.html}
 */
export type ContributionAnalysisDefault = {
  /**
   * @minLength `1`
   * @maxLength `4`
   */
  ContributorDimensions: ColumnIdentifier[];
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  MeasureFieldId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CrossDatasetTypes`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-crossdatasettypes.html}
 */
export type CrossDatasetTypes = "ALL_DATASETS" | "SINGLE_DATASET";
/**
 * Type definition for `AWS::QuickSight::Analysis.CurrencyDisplayFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-currencydisplayformatconfiguration.html}
 */
export type CurrencyDisplayFormatConfiguration = {
  DecimalPlacesConfiguration?: DecimalPlacesConfiguration;
  NegativeValueConfiguration?: NegativeValueConfiguration;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
  NumberScale?: NumberScale;
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Prefix?: string;
  SeparatorConfiguration?: NumericSeparatorConfiguration;
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Suffix?: string;
  /**
   * @pattern `[A-Z]{3}`
   */
  Symbol?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomActionFilterOperation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customactionfilteroperation.html}
 */
export type CustomActionFilterOperation = {
  SelectedFieldsConfiguration: FilterOperationSelectedFieldsConfiguration;
  TargetVisualsConfiguration: FilterOperationTargetVisualsConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomActionNavigationOperation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customactionnavigationoperation.html}
 */
export type CustomActionNavigationOperation = {
  LocalNavigationConfiguration?: LocalNavigationConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomActionSetParametersOperation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customactionsetparametersoperation.html}
 */
export type CustomActionSetParametersOperation = {
  /**
   * @minLength `1`
   * @maxLength `200`
   */
  ParameterValueConfigurations: SetParameterValueConfiguration[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomActionURLOperation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customactionurloperation.html}
 */
export type CustomActionURLOperation = {
  URLTarget: URLTargetConfiguration;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  URLTemplate: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customcolor.html}
 */
export type CustomColor = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color: string;
  /**
   * @maxLength `2048`
   */
  FieldValue?: string;
  SpecialValue?: SpecialValue;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomContentConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customcontentconfiguration.html}
 */
export type CustomContentConfiguration = {
  ContentType?: CustomContentType;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  ContentUrl?: string;
  ImageScaling?: CustomContentImageScalingConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomContentImageScalingConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customcontentimagescalingconfiguration.html}
 */
export type CustomContentImageScalingConfiguration =
  | "FIT_TO_HEIGHT"
  | "FIT_TO_WIDTH"
  | "DO_NOT_SCALE"
  | "SCALE_TO_VISUAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomContentType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customcontenttype.html}
 */
export type CustomContentType = "IMAGE" | "OTHER_EMBEDDED_CONTENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomContentVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customcontentvisual.html}
 */
export type CustomContentVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: CustomContentConfiguration;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  DataSetIdentifier: string;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomFilterConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customfilterconfiguration.html}
 */
export type CustomFilterConfiguration = {
  /**
   * @maxLength `512`
   */
  CategoryValue?: string;
  MatchOperator: CategoryFilterMatchOperator;
  NullOption: FilterNullOption;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  ParameterName?: string;
  SelectAllOptions?: CategoryFilterSelectAllOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomFilterListConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customfilterlistconfiguration.html}
 */
export type CustomFilterListConfiguration = {
  /**
   * @maxLength `100000`
   */
  CategoryValues?: string[];
  MatchOperator: CategoryFilterMatchOperator;
  NullOption: FilterNullOption;
  SelectAllOptions?: CategoryFilterSelectAllOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomNarrativeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customnarrativeoptions.html}
 */
export type CustomNarrativeOptions = {
  /**
   * @maxLength `150000`
   */
  Narrative: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomParameterValues`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customparametervalues.html}
 */
export type CustomParameterValues = {
  /**
   * @maxLength `50000`
   */
  DateTimeValues?: string[];
  /**
   * @maxLength `50000`
   */
  DecimalValues?: number[];
  /**
   * @maxLength `50000`
   */
  IntegerValues?: number[];
  /**
   * @maxLength `50000`
   */
  StringValues?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.CustomValuesConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-customvaluesconfiguration.html}
 */
export type CustomValuesConfiguration = {
  CustomValues: CustomParameterValues;
  IncludeNullValue?: boolean;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataBarsOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-databarsoptions.html}
 */
export type DataBarsOptions = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  NegativeColor?: string;
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  PositiveColor?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datacolor.html}
 */
export type DataColor = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
  DataValue?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataFieldSeriesItem`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datafieldseriesitem.html}
 */
export type DataFieldSeriesItem = {
  AxisBinding: AxisBinding;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FieldValue?: string;
  Settings?: LineChartSeriesSettings;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataLabelContent`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datalabelcontent.html}
 */
export type DataLabelContent = "VALUE" | "PERCENT" | "VALUE_AND_PERCENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.DataLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datalabeloptions.html}
 */
export type DataLabelOptions = {
  CategoryLabelVisibility?: Visibility;
  /**
   * @maxLength `100`
   */
  DataLabelTypes?: DataLabelType[];
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  LabelColor?: string;
  LabelContent?: DataLabelContent;
  LabelFontConfiguration?: FontConfiguration;
  MeasureLabelVisibility?: Visibility;
  Overlap?: DataLabelOverlap;
  Position?: DataLabelPosition;
  TotalsVisibility?: Visibility;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataLabelOverlap`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datalabeloverlap.html}
 */
export type DataLabelOverlap = "DISABLE_OVERLAP" | "ENABLE_OVERLAP";
/**
 * Type definition for `AWS::QuickSight::Analysis.DataLabelPosition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datalabelposition.html}
 */
export type DataLabelPosition =
  | "INSIDE"
  | "OUTSIDE"
  | "LEFT"
  | "TOP"
  | "BOTTOM"
  | "RIGHT";
/**
 * Type definition for `AWS::QuickSight::Analysis.DataLabelType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datalabeltype.html}
 */
export type DataLabelType = {
  DataPathLabelType?: DataPathLabelType;
  FieldLabelType?: FieldLabelType;
  MaximumLabelType?: MaximumLabelType;
  MinimumLabelType?: MinimumLabelType;
  RangeEndsLabelType?: RangeEndsLabelType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataPathColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datapathcolor.html}
 */
export type DataPathColor = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color: string;
  Element: DataPathValue;
  TimeGranularity?: TimeGranularity;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataPathLabelType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datapathlabeltype.html}
 */
export type DataPathLabelType = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId?: string;
  /**
   * @maxLength `2048`
   */
  FieldValue?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataPathSort`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datapathsort.html}
 */
export type DataPathSort = {
  Direction: SortDirection;
  /**
   * @maxLength `20`
   */
  SortPaths: DataPathValue[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataPathType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datapathtype.html}
 */
export type DataPathType = {
  PivotTableDataPathType?: PivotTableDataPathType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataPathValue`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datapathvalue.html}
 */
export type DataPathValue = {
  DataPathType?: DataPathType;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId?: string;
  /**
   * @maxLength `2048`
   */
  FieldValue?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataSetIdentifierDeclaration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datasetidentifierdeclaration.html}
 */
export type DataSetIdentifierDeclaration = {
  DataSetArn: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Identifier: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DataSetReference`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datasetreference.html}
 */
export type DataSetReference = {
  DataSetArn: string;
  /**
   * @pattern `.*\S.*`
   */
  DataSetPlaceholder: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-dateaggregationfunction.html}
 */
export type DateAggregationFunction =
  | "COUNT"
  | "DISTINCT_COUNT"
  | "MIN"
  | "MAX";
/**
 * Type definition for `AWS::QuickSight::Analysis.DateAxisOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-dateaxisoptions.html}
 */
export type DateAxisOptions = {
  MissingDateVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateDimensionField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datedimensionfield.html}
 */
export type DateDimensionField = {
  Column: ColumnIdentifier;
  DateGranularity?: TimeGranularity;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FormatConfiguration?: DateTimeFormatConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  HierarchyId?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateMeasureField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datemeasurefield.html}
 */
export type DateMeasureField = {
  AggregationFunction?: DateAggregationFunction;
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FormatConfiguration?: DateTimeFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateTimeDefaultValues`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datetimedefaultvalues.html}
 */
export type DateTimeDefaultValues = {
  DynamicValue?: DynamicDefaultValue;
  RollingDate?: RollingDateConfiguration;
  /**
   * @maxLength `50000`
   */
  StaticValues?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateTimeFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datetimeformatconfiguration.html}
 */
export type DateTimeFormatConfiguration = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  DateTimeFormat?: string;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
  NumericFormatConfiguration?: NumericFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateTimeHierarchy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datetimehierarchy.html}
 */
export type DateTimeHierarchy = {
  /**
   * @maxLength `10`
   */
  DrillDownFilters?: DrillDownFilter[];
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  HierarchyId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateTimeParameter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datetimeparameter.html}
 */
export type DateTimeParameter = {
  /**
   * @pattern `.*\S.*`
   */
  Name: string;
  Values: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateTimeParameterDeclaration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datetimeparameterdeclaration.html}
 */
export type DateTimeParameterDeclaration = {
  DefaultValues?: DateTimeDefaultValues;
  /**
   * @maxLength `150`
   */
  MappedDataSetParameters?: MappedDataSetParameter[];
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  Name: string;
  TimeGranularity?: TimeGranularity;
  ValueWhenUnset?: DateTimeValueWhenUnsetConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateTimePickerControlDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datetimepickercontroldisplayoptions.html}
 */
export type DateTimePickerControlDisplayOptions = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  DateTimeFormat?: string;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  TitleOptions?: LabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DateTimeValueWhenUnsetConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-datetimevaluewhenunsetconfiguration.html}
 */
export type DateTimeValueWhenUnsetConfiguration = {
  CustomValue?: string;
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DayOfTheWeek`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-dayoftheweek.html}
 */
export type DayOfTheWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";
/**
 * Type definition for `AWS::QuickSight::Analysis.DecimalDefaultValues`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-decimaldefaultvalues.html}
 */
export type DecimalDefaultValues = {
  DynamicValue?: DynamicDefaultValue;
  /**
   * @maxLength `50000`
   */
  StaticValues?: number[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DecimalParameter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-decimalparameter.html}
 */
export type DecimalParameter = {
  /**
   * @pattern `.*\S.*`
   */
  Name: string;
  Values: number[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DecimalParameterDeclaration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-decimalparameterdeclaration.html}
 */
export type DecimalParameterDeclaration = {
  DefaultValues?: DecimalDefaultValues;
  /**
   * @maxLength `150`
   */
  MappedDataSetParameters?: MappedDataSetParameter[];
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  Name: string;
  ParameterValueType: ParameterValueType;
  ValueWhenUnset?: DecimalValueWhenUnsetConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DecimalPlacesConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-decimalplacesconfiguration.html}
 */
export type DecimalPlacesConfiguration = {
  /**
   * @max `20`
   */
  DecimalPlaces: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DecimalValueWhenUnsetConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-decimalvaluewhenunsetconfiguration.html}
 */
export type DecimalValueWhenUnsetConfiguration = {
  CustomValue?: number;
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DefaultFreeFormLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-defaultfreeformlayoutconfiguration.html}
 */
export type DefaultFreeFormLayoutConfiguration = {
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DefaultGridLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-defaultgridlayoutconfiguration.html}
 */
export type DefaultGridLayoutConfiguration = {
  CanvasSizeOptions: GridLayoutCanvasSizeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DefaultInteractiveLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-defaultinteractivelayoutconfiguration.html}
 */
export type DefaultInteractiveLayoutConfiguration = {
  FreeForm?: DefaultFreeFormLayoutConfiguration;
  Grid?: DefaultGridLayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DefaultNewSheetConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-defaultnewsheetconfiguration.html}
 */
export type DefaultNewSheetConfiguration = {
  InteractiveLayoutConfiguration?: DefaultInteractiveLayoutConfiguration;
  PaginatedLayoutConfiguration?: DefaultPaginatedLayoutConfiguration;
  SheetContentType?: SheetContentType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DefaultPaginatedLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-defaultpaginatedlayoutconfiguration.html}
 */
export type DefaultPaginatedLayoutConfiguration = {
  SectionBased?: DefaultSectionBasedLayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DefaultSectionBasedLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-defaultsectionbasedlayoutconfiguration.html}
 */
export type DefaultSectionBasedLayoutConfiguration = {
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DestinationParameterValueConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-destinationparametervalueconfiguration.html}
 */
export type DestinationParameterValueConfiguration = {
  CustomValuesConfiguration?: CustomValuesConfiguration;
  SelectAllValueOptions?: SelectAllValueOptions;
  SourceColumn?: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  SourceField?: string;
  SourceParameterName?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DimensionField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-dimensionfield.html}
 */
export type DimensionField = {
  CategoricalDimensionField?: CategoricalDimensionField;
  DateDimensionField?: DateDimensionField;
  NumericalDimensionField?: NumericalDimensionField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DonutCenterOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-donutcenteroptions.html}
 */
export type DonutCenterOptions = {
  LabelVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DonutOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-donutoptions.html}
 */
export type DonutOptions = {
  ArcOptions?: ArcOptions;
  DonutCenterOptions?: DonutCenterOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DrillDownFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-drilldownfilter.html}
 */
export type DrillDownFilter = {
  CategoryFilter?: CategoryDrillDownFilter;
  NumericEqualityFilter?: NumericEqualityDrillDownFilter;
  TimeRangeFilter?: TimeRangeDrillDownFilter;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DropDownControlDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-dropdowncontroldisplayoptions.html}
 */
export type DropDownControlDisplayOptions = {
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  SelectAllOptions?: ListControlSelectAllOptions;
  TitleOptions?: LabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.DynamicDefaultValue`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-dynamicdefaultvalue.html}
 */
export type DynamicDefaultValue = {
  DefaultValueColumn: ColumnIdentifier;
  GroupNameColumn?: ColumnIdentifier;
  UserNameColumn?: ColumnIdentifier;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.EmptyVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-emptyvisual.html}
 */
export type EmptyVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  DataSetIdentifier: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.Entity`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-entity.html}
 */
export type Entity = {
  /**
   * @pattern `.*\S.*`
   */
  Path?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ExcludePeriodConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-excludeperiodconfiguration.html}
 */
export type ExcludePeriodConfiguration = {
  Amount: number;
  Granularity: TimeGranularity;
  Status?: WidgetStatus;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ExplicitHierarchy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-explicithierarchy.html}
 */
export type ExplicitHierarchy = {
  /**
   * @minLength `2`
   * @maxLength `10`
   */
  Columns: ColumnIdentifier[];
  /**
   * @maxLength `10`
   */
  DrillDownFilters?: DrillDownFilter[];
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  HierarchyId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FieldBasedTooltip`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fieldbasedtooltip.html}
 */
export type FieldBasedTooltip = {
  AggregationVisibility?: Visibility;
  /**
   * @maxLength `100`
   */
  TooltipFields?: TooltipItem[];
  TooltipTitleType?: TooltipTitleType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FieldLabelType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fieldlabeltype.html}
 */
export type FieldLabelType = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FieldSeriesItem`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fieldseriesitem.html}
 */
export type FieldSeriesItem = {
  AxisBinding: AxisBinding;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  Settings?: LineChartSeriesSettings;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FieldSort`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fieldsort.html}
 */
export type FieldSort = {
  Direction: SortDirection;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FieldSortOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fieldsortoptions.html}
 */
export type FieldSortOptions = {
  ColumnSort?: ColumnSort;
  FieldSort?: FieldSort;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FieldTooltipItem`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fieldtooltipitem.html}
 */
export type FieldTooltipItem = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  Label?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapaggregatedfieldwells.html}
 */
export type FilledMapAggregatedFieldWells = {
  /**
   * @maxLength `1`
   */
  Geospatial?: DimensionField[];
  /**
   * @maxLength `1`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapconditionalformatting.html}
 */
export type FilledMapConditionalFormatting = {
  /**
   * @maxLength `200`
   */
  ConditionalFormattingOptions: FilledMapConditionalFormattingOption[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapConditionalFormattingOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapconditionalformattingoption.html}
 */
export type FilledMapConditionalFormattingOption = {
  Shape: FilledMapShapeConditionalFormatting;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapconfiguration.html}
 */
export type FilledMapConfiguration = {
  FieldWells?: FilledMapFieldWells;
  Legend?: LegendOptions;
  MapStyleOptions?: GeospatialMapStyleOptions;
  SortConfiguration?: FilledMapSortConfiguration;
  Tooltip?: TooltipOptions;
  WindowOptions?: GeospatialWindowOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapfieldwells.html}
 */
export type FilledMapFieldWells = {
  FilledMapAggregatedFieldWells?: FilledMapAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapShapeConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapshapeconditionalformatting.html}
 */
export type FilledMapShapeConditionalFormatting = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  Format?: ShapeConditionalFormat;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapsortconfiguration.html}
 */
export type FilledMapSortConfiguration = {
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilledMapVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filledmapvisual.html}
 */
export type FilledMapVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: FilledMapConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  ConditionalFormatting?: FilledMapConditionalFormatting;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.Filter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filter.html}
 */
export type Filter = {
  CategoryFilter?: CategoryFilter;
  NumericEqualityFilter?: NumericEqualityFilter;
  NumericRangeFilter?: NumericRangeFilter;
  RelativeDatesFilter?: RelativeDatesFilter;
  TimeEqualityFilter?: TimeEqualityFilter;
  TimeRangeFilter?: TimeRangeFilter;
  TopBottomFilter?: TopBottomFilter;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filtercontrol.html}
 */
export type FilterControl = {
  DateTimePicker?: FilterDateTimePickerControl;
  Dropdown?: FilterDropDownControl;
  List?: FilterListControl;
  RelativeDateTime?: FilterRelativeDateTimeControl;
  Slider?: FilterSliderControl;
  TextArea?: FilterTextAreaControl;
  TextField?: FilterTextFieldControl;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterDateTimePickerControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterdatetimepickercontrol.html}
 */
export type FilterDateTimePickerControl = {
  DisplayOptions?: DateTimePickerControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SourceFilterId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
  Type?: SheetControlDateTimePickerType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterDropDownControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterdropdowncontrol.html}
 */
export type FilterDropDownControl = {
  CascadingControlConfiguration?: CascadingControlConfiguration;
  DisplayOptions?: DropDownControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterControlId: string;
  SelectableValues?: FilterSelectableValues;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SourceFilterId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
  Type?: SheetControlListType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterGroup`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filtergroup.html}
 */
export type FilterGroup = {
  CrossDataset: CrossDatasetTypes;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterGroupId: string;
  /**
   * @maxLength `20`
   */
  Filters: Filter[];
  ScopeConfiguration: FilterScopeConfiguration;
  Status?: WidgetStatus;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterListConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterlistconfiguration.html}
 */
export type FilterListConfiguration = {
  /**
   * @maxLength `100000`
   */
  CategoryValues?: string[];
  MatchOperator: CategoryFilterMatchOperator;
  NullOption?: FilterNullOption;
  SelectAllOptions?: CategoryFilterSelectAllOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterListControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterlistcontrol.html}
 */
export type FilterListControl = {
  CascadingControlConfiguration?: CascadingControlConfiguration;
  DisplayOptions?: ListControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterControlId: string;
  SelectableValues?: FilterSelectableValues;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SourceFilterId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
  Type?: SheetControlListType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterNullOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filternulloption.html}
 */
export type FilterNullOption = "ALL_VALUES" | "NULLS_ONLY" | "NON_NULLS_ONLY";
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterOperationSelectedFieldsConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filteroperationselectedfieldsconfiguration.html}
 */
export type FilterOperationSelectedFieldsConfiguration = {
  /**
   * @maxLength `10`
   */
  SelectedColumns?: ColumnIdentifier[];
  SelectedFieldOptions?: SelectedFieldOptions;
  /**
   * @minLength `1`
   * @maxLength `20`
   */
  SelectedFields?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterOperationTargetVisualsConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filteroperationtargetvisualsconfiguration.html}
 */
export type FilterOperationTargetVisualsConfiguration = {
  SameSheetTargetVisualConfiguration?: SameSheetTargetVisualConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterRelativeDateTimeControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterrelativedatetimecontrol.html}
 */
export type FilterRelativeDateTimeControl = {
  DisplayOptions?: RelativeDateTimeControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SourceFilterId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterScopeConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterscopeconfiguration.html}
 */
export type FilterScopeConfiguration = {
  AllSheets?: AllSheetsFilterScopeConfiguration;
  SelectedSheets?: SelectedSheetsFilterScopeConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterSelectableValues`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterselectablevalues.html}
 */
export type FilterSelectableValues = {
  /**
   * @maxLength `50000`
   */
  Values?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterSliderControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filterslidercontrol.html}
 */
export type FilterSliderControl = {
  DisplayOptions?: SliderControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterControlId: string;
  MaximumValue: number;
  MinimumValue: number;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SourceFilterId: string;
  StepSize: number;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
  Type?: SheetControlSliderType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterTextAreaControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filtertextareacontrol.html}
 */
export type FilterTextAreaControl = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Delimiter?: string;
  DisplayOptions?: TextAreaControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SourceFilterId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterTextFieldControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filtertextfieldcontrol.html}
 */
export type FilterTextFieldControl = {
  DisplayOptions?: TextFieldControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SourceFilterId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FilterVisualScope`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-filtervisualscope.html}
 */
export type FilterVisualScope = "ALL_VISUALS" | "SELECTED_VISUALS";
/**
 * Type definition for `AWS::QuickSight::Analysis.FontConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fontconfiguration.html}
 */
export type FontConfiguration = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  FontColor?: string;
  FontDecoration?: FontDecoration;
  FontSize?: FontSize;
  FontStyle?: FontStyle;
  FontWeight?: FontWeight;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FontDecoration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fontdecoration.html}
 */
export type FontDecoration = "UNDERLINE" | "NONE";
/**
 * Type definition for `AWS::QuickSight::Analysis.FontSize`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fontsize.html}
 */
export type FontSize = {
  Relative?: RelativeFontSize;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FontStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fontstyle.html}
 */
export type FontStyle = "NORMAL" | "ITALIC";
/**
 * Type definition for `AWS::QuickSight::Analysis.FontWeight`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fontweight.html}
 */
export type FontWeight = {
  Name?: FontWeightName;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FontWeightName`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-fontweightname.html}
 */
export type FontWeightName = "NORMAL" | "BOLD";
/**
 * Type definition for `AWS::QuickSight::Analysis.ForecastComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-forecastcomputation.html}
 */
export type ForecastComputation = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  /**
   * @min `1`
   * @max `180`
   */
  CustomSeasonalityValue?: number;
  LowerBoundary?: number;
  Name?: string;
  /**
   * @max `1000`
   */
  PeriodsBackward?: number;
  /**
   * @min `1`
   * @max `1000`
   */
  PeriodsForward?: number;
  /**
   * @min `50`
   * @max `95`
   */
  PredictionInterval?: number;
  Seasonality?: ForecastComputationSeasonality;
  Time?: DimensionField;
  UpperBoundary?: number;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ForecastComputationSeasonality`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-forecastcomputationseasonality.html}
 */
export type ForecastComputationSeasonality = "AUTOMATIC" | "CUSTOM";
/**
 * Type definition for `AWS::QuickSight::Analysis.ForecastConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-forecastconfiguration.html}
 */
export type ForecastConfiguration = {
  ForecastProperties?: TimeBasedForecastProperties;
  Scenario?: ForecastScenario;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ForecastScenario`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-forecastscenario.html}
 */
export type ForecastScenario = {
  WhatIfPointScenario?: WhatIfPointScenario;
  WhatIfRangeScenario?: WhatIfRangeScenario;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-formatconfiguration.html}
 */
export type FormatConfiguration = {
  DateTimeFormatConfiguration?: DateTimeFormatConfiguration;
  NumberFormatConfiguration?: NumberFormatConfiguration;
  StringFormatConfiguration?: StringFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FreeFormLayoutCanvasSizeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-freeformlayoutcanvassizeoptions.html}
 */
export type FreeFormLayoutCanvasSizeOptions = {
  ScreenCanvasSizeOptions?: FreeFormLayoutScreenCanvasSizeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FreeFormLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-freeformlayoutconfiguration.html}
 */
export type FreeFormLayoutConfiguration = {
  CanvasSizeOptions?: FreeFormLayoutCanvasSizeOptions;
  /**
   * @maxLength `430`
   */
  Elements: FreeFormLayoutElement[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FreeFormLayoutElement`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-freeformlayoutelement.html}
 */
export type FreeFormLayoutElement = {
  BackgroundStyle?: FreeFormLayoutElementBackgroundStyle;
  BorderStyle?: FreeFormLayoutElementBorderStyle;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ElementId: string;
  ElementType: LayoutElementType;
  /**
   * String based length that is composed of value and unit in px
   */
  Height: string;
  LoadingAnimation?: LoadingAnimation;
  /**
   * @maxLength `10000`
   */
  RenderingRules?: SheetElementRenderingRule[];
  SelectedBorderStyle?: FreeFormLayoutElementBorderStyle;
  Visibility?: Visibility;
  /**
   * String based length that is composed of value and unit in px
   */
  Width: string;
  /**
   * String based length that is composed of value and unit in px
   */
  XAxisLocation: string;
  /**
   * String based length that is composed of value and unit in px with Integer.MAX_VALUE as maximum value
   */
  YAxisLocation: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FreeFormLayoutElementBackgroundStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-freeformlayoutelementbackgroundstyle.html}
 */
export type FreeFormLayoutElementBackgroundStyle = {
  /**
   * @pattern `^#[A-F0-9]{6}(?:[A-F0-9]{2})?$`
   */
  Color?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FreeFormLayoutElementBorderStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-freeformlayoutelementborderstyle.html}
 */
export type FreeFormLayoutElementBorderStyle = {
  /**
   * @pattern `^#[A-F0-9]{6}(?:[A-F0-9]{2})?$`
   */
  Color?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FreeFormLayoutScreenCanvasSizeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-freeformlayoutscreencanvassizeoptions.html}
 */
export type FreeFormLayoutScreenCanvasSizeOptions = {
  /**
   * String based length that is composed of value and unit in px
   */
  OptimizedViewPortWidth: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FreeFormSectionLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-freeformsectionlayoutconfiguration.html}
 */
export type FreeFormSectionLayoutConfiguration = {
  /**
   * @maxLength `430`
   */
  Elements: FreeFormLayoutElement[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FunnelChartAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-funnelchartaggregatedfieldwells.html}
 */
export type FunnelChartAggregatedFieldWells = {
  /**
   * @maxLength `1`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `1`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FunnelChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-funnelchartconfiguration.html}
 */
export type FunnelChartConfiguration = {
  CategoryLabelOptions?: ChartAxisLabelOptions;
  DataLabelOptions?: FunnelChartDataLabelOptions;
  FieldWells?: FunnelChartFieldWells;
  SortConfiguration?: FunnelChartSortConfiguration;
  Tooltip?: TooltipOptions;
  ValueLabelOptions?: ChartAxisLabelOptions;
  VisualPalette?: VisualPalette;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FunnelChartDataLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-funnelchartdatalabeloptions.html}
 */
export type FunnelChartDataLabelOptions = {
  CategoryLabelVisibility?: Visibility;
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  LabelColor?: string;
  LabelFontConfiguration?: FontConfiguration;
  MeasureDataLabelStyle?: FunnelChartMeasureDataLabelStyle;
  MeasureLabelVisibility?: Visibility;
  Position?: DataLabelPosition;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FunnelChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-funnelchartfieldwells.html}
 */
export type FunnelChartFieldWells = {
  FunnelChartAggregatedFieldWells?: FunnelChartAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FunnelChartMeasureDataLabelStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-funnelchartmeasuredatalabelstyle.html}
 */
export type FunnelChartMeasureDataLabelStyle =
  | "VALUE_ONLY"
  | "PERCENTAGE_BY_FIRST_STAGE"
  | "PERCENTAGE_BY_PREVIOUS_STAGE"
  | "VALUE_AND_PERCENTAGE_BY_FIRST_STAGE"
  | "VALUE_AND_PERCENTAGE_BY_PREVIOUS_STAGE";
/**
 * Type definition for `AWS::QuickSight::Analysis.FunnelChartSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-funnelchartsortconfiguration.html}
 */
export type FunnelChartSortConfiguration = {
  CategoryItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.FunnelChartVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-funnelchartvisual.html}
 */
export type FunnelChartVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: FunnelChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartArcConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartarcconditionalformatting.html}
 */
export type GaugeChartArcConditionalFormatting = {
  ForegroundColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartconditionalformatting.html}
 */
export type GaugeChartConditionalFormatting = {
  /**
   * @maxLength `100`
   */
  ConditionalFormattingOptions?: GaugeChartConditionalFormattingOption[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartConditionalFormattingOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartconditionalformattingoption.html}
 */
export type GaugeChartConditionalFormattingOption = {
  Arc?: GaugeChartArcConditionalFormatting;
  PrimaryValue?: GaugeChartPrimaryValueConditionalFormatting;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartconfiguration.html}
 */
export type GaugeChartConfiguration = {
  DataLabels?: DataLabelOptions;
  FieldWells?: GaugeChartFieldWells;
  GaugeChartOptions?: GaugeChartOptions;
  TooltipOptions?: TooltipOptions;
  VisualPalette?: VisualPalette;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartfieldwells.html}
 */
export type GaugeChartFieldWells = {
  /**
   * @maxLength `200`
   */
  TargetValues?: MeasureField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartoptions.html}
 */
export type GaugeChartOptions = {
  Arc?: ArcConfiguration;
  ArcAxis?: ArcAxisConfiguration;
  Comparison?: ComparisonConfiguration;
  PrimaryValueDisplayType?: PrimaryValueDisplayType;
  PrimaryValueFontConfiguration?: FontConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartPrimaryValueConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartprimaryvalueconditionalformatting.html}
 */
export type GaugeChartPrimaryValueConditionalFormatting = {
  Icon?: ConditionalFormattingIcon;
  TextColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GaugeChartVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gaugechartvisual.html}
 */
export type GaugeChartVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: GaugeChartConfiguration;
  ConditionalFormatting?: GaugeChartConditionalFormatting;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialCoordinateBounds`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialcoordinatebounds.html}
 */
export type GeospatialCoordinateBounds = {
  /**
   * @min `-1800`
   * @max `1800`
   */
  East: number;
  /**
   * @min `-90`
   * @max `90`
   */
  North: number;
  /**
   * @min `-90`
   * @max `90`
   */
  South: number;
  /**
   * @min `-1800`
   * @max `1800`
   */
  West: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialHeatmapColorScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialheatmapcolorscale.html}
 */
export type GeospatialHeatmapColorScale = {
  /**
   * @minLength `2`
   * @maxLength `2`
   */
  Colors?: GeospatialHeatmapDataColor[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialHeatmapConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialheatmapconfiguration.html}
 */
export type GeospatialHeatmapConfiguration = {
  HeatmapColor?: GeospatialHeatmapColorScale;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialHeatmapDataColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialheatmapdatacolor.html}
 */
export type GeospatialHeatmapDataColor = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialMapAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialmapaggregatedfieldwells.html}
 */
export type GeospatialMapAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Colors?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Geospatial?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialMapConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialmapconfiguration.html}
 */
export type GeospatialMapConfiguration = {
  FieldWells?: GeospatialMapFieldWells;
  Legend?: LegendOptions;
  MapStyleOptions?: GeospatialMapStyleOptions;
  PointStyleOptions?: GeospatialPointStyleOptions;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
  WindowOptions?: GeospatialWindowOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialMapFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialmapfieldwells.html}
 */
export type GeospatialMapFieldWells = {
  GeospatialMapAggregatedFieldWells?: GeospatialMapAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialMapStyleOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialmapstyleoptions.html}
 */
export type GeospatialMapStyleOptions = {
  BaseMapStyle?: BaseMapStyleType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialMapVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialmapvisual.html}
 */
export type GeospatialMapVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: GeospatialMapConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialPointStyleOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialpointstyleoptions.html}
 */
export type GeospatialPointStyleOptions = {
  ClusterMarkerConfiguration?: ClusterMarkerConfiguration;
  HeatmapConfiguration?: GeospatialHeatmapConfiguration;
  SelectedPointStyle?: GeospatialSelectedPointStyle;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialSelectedPointStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialselectedpointstyle.html}
 */
export type GeospatialSelectedPointStyle = "POINT" | "CLUSTER" | "HEATMAP";
/**
 * Type definition for `AWS::QuickSight::Analysis.GeospatialWindowOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-geospatialwindowoptions.html}
 */
export type GeospatialWindowOptions = {
  Bounds?: GeospatialCoordinateBounds;
  MapZoomMode?: MapZoomMode;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GlobalTableBorderOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-globaltableborderoptions.html}
 */
export type GlobalTableBorderOptions = {
  SideSpecificBorder?: TableSideBorderOptions;
  UniformBorder?: TableBorderOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GradientColor`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gradientcolor.html}
 */
export type GradientColor = {
  /**
   * @maxLength `100`
   */
  Stops?: GradientStop[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GradientStop`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gradientstop.html}
 */
export type GradientStop = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
  DataValue?: number;
  GradientOffset: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GridLayoutCanvasSizeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gridlayoutcanvassizeoptions.html}
 */
export type GridLayoutCanvasSizeOptions = {
  ScreenCanvasSizeOptions?: GridLayoutScreenCanvasSizeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GridLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gridlayoutconfiguration.html}
 */
export type GridLayoutConfiguration = {
  CanvasSizeOptions?: GridLayoutCanvasSizeOptions;
  /**
   * @maxLength `430`
   */
  Elements: GridLayoutElement[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GridLayoutElement`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gridlayoutelement.html}
 */
export type GridLayoutElement = {
  /**
   * @max `35`
   */
  ColumnIndex?: number;
  /**
   * @min `1`
   * @max `36`
   */
  ColumnSpan: number;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ElementId: string;
  ElementType: LayoutElementType;
  /**
   * @max `9009`
   */
  RowIndex?: number;
  /**
   * @min `1`
   * @max `21`
   */
  RowSpan: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GridLayoutScreenCanvasSizeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-gridlayoutscreencanvassizeoptions.html}
 */
export type GridLayoutScreenCanvasSizeOptions = {
  /**
   * String based length that is composed of value and unit in px
   */
  OptimizedViewPortWidth?: string;
  ResizeOption: ResizeOption;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.GrowthRateComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-growthratecomputation.html}
 */
export type GrowthRateComputation = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  Name?: string;
  /**
   * @min `2`
   * @max `52`
   */
  PeriodSize?: number;
  Time?: DimensionField;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HeaderFooterSectionConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-headerfootersectionconfiguration.html}
 */
export type HeaderFooterSectionConfiguration = {
  Layout: SectionLayoutConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SectionId: string;
  Style?: SectionStyle;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HeatMapAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-heatmapaggregatedfieldwells.html}
 */
export type HeatMapAggregatedFieldWells = {
  /**
   * @maxLength `1`
   */
  Columns?: DimensionField[];
  /**
   * @maxLength `1`
   */
  Rows?: DimensionField[];
  /**
   * @maxLength `1`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HeatMapConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-heatmapconfiguration.html}
 */
export type HeatMapConfiguration = {
  ColorScale?: ColorScale;
  ColumnLabelOptions?: ChartAxisLabelOptions;
  DataLabels?: DataLabelOptions;
  FieldWells?: HeatMapFieldWells;
  Legend?: LegendOptions;
  RowLabelOptions?: ChartAxisLabelOptions;
  SortConfiguration?: HeatMapSortConfiguration;
  Tooltip?: TooltipOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HeatMapFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-heatmapfieldwells.html}
 */
export type HeatMapFieldWells = {
  HeatMapAggregatedFieldWells?: HeatMapAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HeatMapSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-heatmapsortconfiguration.html}
 */
export type HeatMapSortConfiguration = {
  HeatMapColumnItemsLimitConfiguration?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  HeatMapColumnSort?: FieldSortOptions[];
  HeatMapRowItemsLimitConfiguration?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  HeatMapRowSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HeatMapVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-heatmapvisual.html}
 */
export type HeatMapVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: HeatMapConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HistogramAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-histogramaggregatedfieldwells.html}
 */
export type HistogramAggregatedFieldWells = {
  /**
   * @maxLength `1`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HistogramBinOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-histogrambinoptions.html}
 */
export type HistogramBinOptions = {
  BinCount?: BinCountOptions;
  BinWidth?: BinWidthOptions;
  SelectedBinType?: HistogramBinType;
  StartValue?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HistogramBinType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-histogrambintype.html}
 */
export type HistogramBinType = "BIN_COUNT" | "BIN_WIDTH";
/**
 * Type definition for `AWS::QuickSight::Analysis.HistogramConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-histogramconfiguration.html}
 */
export type HistogramConfiguration = {
  BinOptions?: HistogramBinOptions;
  DataLabels?: DataLabelOptions;
  FieldWells?: HistogramFieldWells;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
  XAxisDisplayOptions?: AxisDisplayOptions;
  XAxisLabelOptions?: ChartAxisLabelOptions;
  YAxisDisplayOptions?: AxisDisplayOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HistogramFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-histogramfieldwells.html}
 */
export type HistogramFieldWells = {
  HistogramAggregatedFieldWells?: HistogramAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HistogramVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-histogramvisual.html}
 */
export type HistogramVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: HistogramConfiguration;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.HorizontalTextAlignment`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-horizontaltextalignment.html}
 */
export type HorizontalTextAlignment = "LEFT" | "CENTER" | "RIGHT" | "AUTO";
/**
 * Type definition for `AWS::QuickSight::Analysis.Icon`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-icon.html}
 */
export type Icon =
  | "CARET_UP"
  | "CARET_DOWN"
  | "PLUS"
  | "MINUS"
  | "ARROW_UP"
  | "ARROW_DOWN"
  | "ARROW_LEFT"
  | "ARROW_UP_LEFT"
  | "ARROW_DOWN_LEFT"
  | "ARROW_RIGHT"
  | "ARROW_UP_RIGHT"
  | "ARROW_DOWN_RIGHT"
  | "FACE_UP"
  | "FACE_DOWN"
  | "FACE_FLAT"
  | "ONE_BAR"
  | "TWO_BAR"
  | "THREE_BAR"
  | "CIRCLE"
  | "TRIANGLE"
  | "SQUARE"
  | "FLAG"
  | "THUMBS_UP"
  | "THUMBS_DOWN"
  | "CHECKMARK"
  | "X";
/**
 * Type definition for `AWS::QuickSight::Analysis.InsightConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-insightconfiguration.html}
 */
export type InsightConfiguration = {
  /**
   * @maxLength `100`
   */
  Computations?: Computation[];
  CustomNarrative?: CustomNarrativeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.InsightVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-insightvisual.html}
 */
export type InsightVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  DataSetIdentifier: string;
  InsightConfiguration?: InsightConfiguration;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.IntegerDefaultValues`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-integerdefaultvalues.html}
 */
export type IntegerDefaultValues = {
  DynamicValue?: DynamicDefaultValue;
  /**
   * @maxLength `50000`
   */
  StaticValues?: number[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.IntegerParameter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-integerparameter.html}
 */
export type IntegerParameter = {
  /**
   * @pattern `.*\S.*`
   */
  Name: string;
  Values: number[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.IntegerParameterDeclaration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-integerparameterdeclaration.html}
 */
export type IntegerParameterDeclaration = {
  DefaultValues?: IntegerDefaultValues;
  /**
   * @maxLength `150`
   */
  MappedDataSetParameters?: MappedDataSetParameter[];
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  Name: string;
  ParameterValueType: ParameterValueType;
  ValueWhenUnset?: IntegerValueWhenUnsetConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.IntegerValueWhenUnsetConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-integervaluewhenunsetconfiguration.html}
 */
export type IntegerValueWhenUnsetConfiguration = {
  CustomValue?: number;
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ItemsLimitConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-itemslimitconfiguration.html}
 */
export type ItemsLimitConfiguration = {
  ItemsLimit?: number;
  OtherCategories?: OtherCategories;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIActualValueConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpiactualvalueconditionalformatting.html}
 */
export type KPIActualValueConditionalFormatting = {
  Icon?: ConditionalFormattingIcon;
  TextColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIComparisonValueConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpicomparisonvalueconditionalformatting.html}
 */
export type KPIComparisonValueConditionalFormatting = {
  Icon?: ConditionalFormattingIcon;
  TextColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpiconditionalformatting.html}
 */
export type KPIConditionalFormatting = {
  /**
   * @maxLength `100`
   */
  ConditionalFormattingOptions?: KPIConditionalFormattingOption[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIConditionalFormattingOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpiconditionalformattingoption.html}
 */
export type KPIConditionalFormattingOption = {
  ActualValue?: KPIActualValueConditionalFormatting;
  ComparisonValue?: KPIComparisonValueConditionalFormatting;
  PrimaryValue?: KPIPrimaryValueConditionalFormatting;
  ProgressBar?: KPIProgressBarConditionalFormatting;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpiconfiguration.html}
 */
export type KPIConfiguration = {
  FieldWells?: KPIFieldWells;
  KPIOptions?: KPIOptions;
  SortConfiguration?: KPISortConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpifieldwells.html}
 */
export type KPIFieldWells = {
  /**
   * @maxLength `200`
   */
  TargetValues?: MeasureField[];
  /**
   * @maxLength `200`
   */
  TrendGroups?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpioptions.html}
 */
export type KPIOptions = {
  Comparison?: ComparisonConfiguration;
  PrimaryValueDisplayType?: PrimaryValueDisplayType;
  PrimaryValueFontConfiguration?: FontConfiguration;
  ProgressBar?: ProgressBarOptions;
  SecondaryValue?: SecondaryValueOptions;
  SecondaryValueFontConfiguration?: FontConfiguration;
  Sparkline?: KPISparklineOptions;
  TrendArrows?: TrendArrowOptions;
  VisualLayoutOptions?: KPIVisualLayoutOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIPrimaryValueConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpiprimaryvalueconditionalformatting.html}
 */
export type KPIPrimaryValueConditionalFormatting = {
  Icon?: ConditionalFormattingIcon;
  TextColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIProgressBarConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpiprogressbarconditionalformatting.html}
 */
export type KPIProgressBarConditionalFormatting = {
  ForegroundColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPISortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpisortconfiguration.html}
 */
export type KPISortConfiguration = {
  /**
   * @maxLength `100`
   */
  TrendGroupSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPISparklineOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpisparklineoptions.html}
 */
export type KPISparklineOptions = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
  TooltipVisibility?: Visibility;
  Type: KPISparklineType;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPISparklineType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpisparklinetype.html}
 */
export type KPISparklineType = "LINE" | "AREA";
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpivisual.html}
 */
export type KPIVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: KPIConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  ConditionalFormatting?: KPIConditionalFormatting;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIVisualLayoutOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpivisuallayoutoptions.html}
 */
export type KPIVisualLayoutOptions = {
  StandardLayout?: KPIVisualStandardLayout;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIVisualStandardLayout`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpivisualstandardlayout.html}
 */
export type KPIVisualStandardLayout = {
  Type: KPIVisualStandardLayoutType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.KPIVisualStandardLayoutType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-kpivisualstandardlayouttype.html}
 */
export type KPIVisualStandardLayoutType = "CLASSIC" | "VERTICAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.LabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-labeloptions.html}
 */
export type LabelOptions = {
  CustomLabel?: string;
  FontConfiguration?: FontConfiguration;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.Layout`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-layout.html}
 */
export type Layout = {
  Configuration: LayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-layoutconfiguration.html}
 */
export type LayoutConfiguration = {
  FreeFormLayout?: FreeFormLayoutConfiguration;
  GridLayout?: GridLayoutConfiguration;
  SectionBasedLayout?: SectionBasedLayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LayoutElementType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-layoutelementtype.html}
 */
export type LayoutElementType =
  | "VISUAL"
  | "FILTER_CONTROL"
  | "PARAMETER_CONTROL"
  | "TEXT_BOX";
/**
 * Type definition for `AWS::QuickSight::Analysis.LegendOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-legendoptions.html}
 */
export type LegendOptions = {
  /**
   * String based length that is composed of value and unit in px
   */
  Height?: string;
  Position?: LegendPosition;
  Title?: LabelOptions;
  Visibility?: Visibility;
  /**
   * String based length that is composed of value and unit in px
   */
  Width?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LegendPosition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-legendposition.html}
 */
export type LegendPosition = "AUTO" | "RIGHT" | "BOTTOM" | "TOP";
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartaggregatedfieldwells.html}
 */
export type LineChartAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Colors?: DimensionField[];
  /**
   * @maxLength `1`
   */
  SmallMultiples?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartconfiguration.html}
 */
export type LineChartConfiguration = {
  /**
   * @minLength `1`
   * @maxLength `200`
   */
  ContributionAnalysisDefaults?: ContributionAnalysisDefault[];
  DataLabels?: DataLabelOptions;
  DefaultSeriesSettings?: LineChartDefaultSeriesSettings;
  FieldWells?: LineChartFieldWells;
  /**
   * @maxLength `10`
   */
  ForecastConfigurations?: ForecastConfiguration[];
  Legend?: LegendOptions;
  PrimaryYAxisDisplayOptions?: LineSeriesAxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  /**
   * @maxLength `20`
   */
  ReferenceLines?: ReferenceLine[];
  SecondaryYAxisDisplayOptions?: LineSeriesAxisDisplayOptions;
  SecondaryYAxisLabelOptions?: ChartAxisLabelOptions;
  /**
   * @maxLength `10`
   */
  Series?: SeriesItem[];
  SmallMultiplesOptions?: SmallMultiplesOptions;
  SortConfiguration?: LineChartSortConfiguration;
  Tooltip?: TooltipOptions;
  Type?: LineChartType;
  VisualPalette?: VisualPalette;
  XAxisDisplayOptions?: AxisDisplayOptions;
  XAxisLabelOptions?: ChartAxisLabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartDefaultSeriesSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartdefaultseriessettings.html}
 */
export type LineChartDefaultSeriesSettings = {
  AxisBinding?: AxisBinding;
  LineStyleSettings?: LineChartLineStyleSettings;
  MarkerStyleSettings?: LineChartMarkerStyleSettings;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartfieldwells.html}
 */
export type LineChartFieldWells = {
  LineChartAggregatedFieldWells?: LineChartAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartLineStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartlinestyle.html}
 */
export type LineChartLineStyle = "SOLID" | "DOTTED" | "DASHED";
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartLineStyleSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartlinestylesettings.html}
 */
export type LineChartLineStyleSettings = {
  LineInterpolation?: LineInterpolation;
  LineStyle?: LineChartLineStyle;
  LineVisibility?: Visibility;
  /**
   * String based length that is composed of value and unit in px
   */
  LineWidth?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartMarkerShape`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartmarkershape.html}
 */
export type LineChartMarkerShape =
  | "CIRCLE"
  | "TRIANGLE"
  | "SQUARE"
  | "DIAMOND"
  | "ROUNDED_SQUARE";
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartMarkerStyleSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartmarkerstylesettings.html}
 */
export type LineChartMarkerStyleSettings = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  MarkerColor?: string;
  MarkerShape?: LineChartMarkerShape;
  /**
   * String based length that is composed of value and unit in px
   */
  MarkerSize?: string;
  MarkerVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartSeriesSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartseriessettings.html}
 */
export type LineChartSeriesSettings = {
  LineStyleSettings?: LineChartLineStyleSettings;
  MarkerStyleSettings?: LineChartMarkerStyleSettings;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartsortconfiguration.html}
 */
export type LineChartSortConfiguration = {
  CategoryItemsLimitConfiguration?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
  ColorItemsLimitConfiguration?: ItemsLimitConfiguration;
  SmallMultiplesLimitConfiguration?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  SmallMultiplesSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linecharttype.html}
 */
export type LineChartType = "LINE" | "AREA" | "STACKED_AREA";
/**
 * Type definition for `AWS::QuickSight::Analysis.LineChartVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-linechartvisual.html}
 */
export type LineChartVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: LineChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LineInterpolation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-lineinterpolation.html}
 */
export type LineInterpolation = "LINEAR" | "SMOOTH" | "STEPPED";
/**
 * Type definition for `AWS::QuickSight::Analysis.LineSeriesAxisDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-lineseriesaxisdisplayoptions.html}
 */
export type LineSeriesAxisDisplayOptions = {
  AxisOptions?: AxisDisplayOptions;
  /**
   * @maxLength `100`
   */
  MissingDataConfigurations?: MissingDataConfiguration[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ListControlDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-listcontroldisplayoptions.html}
 */
export type ListControlDisplayOptions = {
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  SearchOptions?: ListControlSearchOptions;
  SelectAllOptions?: ListControlSelectAllOptions;
  TitleOptions?: LabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ListControlSearchOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-listcontrolsearchoptions.html}
 */
export type ListControlSearchOptions = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ListControlSelectAllOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-listcontrolselectalloptions.html}
 */
export type ListControlSelectAllOptions = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LoadingAnimation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-loadinganimation.html}
 */
export type LoadingAnimation = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LocalNavigationConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-localnavigationconfiguration.html}
 */
export type LocalNavigationConfiguration = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  TargetSheetId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.LongFormatText`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-longformattext.html}
 */
export type LongFormatText = {
  /**
   * @minLength `1`
   * @maxLength `1024`
   */
  PlainText?: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  RichText?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MapZoomMode`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-mapzoommode.html}
 */
export type MapZoomMode = "AUTO" | "MANUAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.MappedDataSetParameter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-mappeddatasetparameter.html}
 */
export type MappedDataSetParameter = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  DataSetIdentifier: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  DataSetParameterName: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MaximumLabelType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-maximumlabeltype.html}
 */
export type MaximumLabelType = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MaximumMinimumComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-maximumminimumcomputation.html}
 */
export type MaximumMinimumComputation = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Type: MaximumMinimumComputationType;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MaximumMinimumComputationType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-maximumminimumcomputationtype.html}
 */
export type MaximumMinimumComputationType = "MAXIMUM" | "MINIMUM";
/**
 * Type definition for `AWS::QuickSight::Analysis.MeasureField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-measurefield.html}
 */
export type MeasureField = {
  CalculatedMeasureField?: CalculatedMeasureField;
  CategoricalMeasureField?: CategoricalMeasureField;
  DateMeasureField?: DateMeasureField;
  NumericalMeasureField?: NumericalMeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MetricComparisonComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-metriccomparisoncomputation.html}
 */
export type MetricComparisonComputation = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  FromValue?: MeasureField;
  Name?: string;
  TargetValue?: MeasureField;
  Time?: DimensionField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MinimumLabelType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-minimumlabeltype.html}
 */
export type MinimumLabelType = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MissingDataConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-missingdataconfiguration.html}
 */
export type MissingDataConfiguration = {
  TreatmentOption?: MissingDataTreatmentOption;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.MissingDataTreatmentOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-missingdatatreatmentoption.html}
 */
export type MissingDataTreatmentOption =
  | "INTERPOLATE"
  | "SHOW_AS_ZERO"
  | "SHOW_AS_BLANK";
/**
 * Type definition for `AWS::QuickSight::Analysis.NegativeValueConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-negativevalueconfiguration.html}
 */
export type NegativeValueConfiguration = {
  DisplayMode: NegativeValueDisplayMode;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NegativeValueDisplayMode`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-negativevaluedisplaymode.html}
 */
export type NegativeValueDisplayMode = "POSITIVE" | "NEGATIVE";
/**
 * Type definition for `AWS::QuickSight::Analysis.NullValueFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-nullvalueformatconfiguration.html}
 */
export type NullValueFormatConfiguration = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  NullString: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumberDisplayFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numberdisplayformatconfiguration.html}
 */
export type NumberDisplayFormatConfiguration = {
  DecimalPlacesConfiguration?: DecimalPlacesConfiguration;
  NegativeValueConfiguration?: NegativeValueConfiguration;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
  NumberScale?: NumberScale;
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Prefix?: string;
  SeparatorConfiguration?: NumericSeparatorConfiguration;
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Suffix?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumberFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numberformatconfiguration.html}
 */
export type NumberFormatConfiguration = {
  FormatConfiguration?: NumericFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumberScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numberscale.html}
 */
export type NumberScale =
  | "NONE"
  | "AUTO"
  | "THOUSANDS"
  | "MILLIONS"
  | "BILLIONS"
  | "TRILLIONS";
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericAxisOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericaxisoptions.html}
 */
export type NumericAxisOptions = {
  Range?: AxisDisplayRange;
  Scale?: AxisScale;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericEqualityDrillDownFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericequalitydrilldownfilter.html}
 */
export type NumericEqualityDrillDownFilter = {
  Column: ColumnIdentifier;
  Value: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericEqualityFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericequalityfilter.html}
 */
export type NumericEqualityFilter = {
  AggregationFunction?: AggregationFunction;
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterId: string;
  MatchOperator: NumericEqualityMatchOperator;
  NullOption: FilterNullOption;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  ParameterName?: string;
  SelectAllOptions?: NumericFilterSelectAllOptions;
  Value?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericEqualityMatchOperator`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericequalitymatchoperator.html}
 */
export type NumericEqualityMatchOperator = "EQUALS" | "DOES_NOT_EQUAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericFilterSelectAllOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericfilterselectalloptions.html}
 */
export type NumericFilterSelectAllOptions = "FILTER_ALL_VALUES";
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericformatconfiguration.html}
 */
export type NumericFormatConfiguration = {
  CurrencyDisplayFormatConfiguration?: CurrencyDisplayFormatConfiguration;
  NumberDisplayFormatConfiguration?: NumberDisplayFormatConfiguration;
  PercentageDisplayFormatConfiguration?: PercentageDisplayFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericRangeFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericrangefilter.html}
 */
export type NumericRangeFilter = {
  AggregationFunction?: AggregationFunction;
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterId: string;
  IncludeMaximum?: boolean;
  IncludeMinimum?: boolean;
  NullOption: FilterNullOption;
  RangeMaximum?: NumericRangeFilterValue;
  RangeMinimum?: NumericRangeFilterValue;
  SelectAllOptions?: NumericFilterSelectAllOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericRangeFilterValue`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericrangefiltervalue.html}
 */
export type NumericRangeFilterValue = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  Parameter?: string;
  StaticValue?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericSeparatorConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericseparatorconfiguration.html}
 */
export type NumericSeparatorConfiguration = {
  DecimalSeparator?: NumericSeparatorSymbol;
  ThousandsSeparator?: ThousandSeparatorOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericSeparatorSymbol`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericseparatorsymbol.html}
 */
export type NumericSeparatorSymbol = "COMMA" | "DOT" | "SPACE";
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericalAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericalaggregationfunction.html}
 */
export type NumericalAggregationFunction = {
  PercentileAggregation?: PercentileAggregation;
  SimpleNumericalAggregation?: SimpleNumericalAggregationFunction;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericalDimensionField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericaldimensionfield.html}
 */
export type NumericalDimensionField = {
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FormatConfiguration?: NumberFormatConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  HierarchyId?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.NumericalMeasureField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-numericalmeasurefield.html}
 */
export type NumericalMeasureField = {
  AggregationFunction?: NumericalAggregationFunction;
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FormatConfiguration?: NumberFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.OtherCategories`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-othercategories.html}
 */
export type OtherCategories = "INCLUDE" | "EXCLUDE";
/**
 * Type definition for `AWS::QuickSight::Analysis.PaginationConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-paginationconfiguration.html}
 */
export type PaginationConfiguration = {
  PageNumber: number;
  PageSize: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PanelBorderStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-panelborderstyle.html}
 */
export type PanelBorderStyle = "SOLID" | "DASHED" | "DOTTED";
/**
 * Type definition for `AWS::QuickSight::Analysis.PanelConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-panelconfiguration.html}
 */
export type PanelConfiguration = {
  /**
   * @pattern `^#[A-F0-9]{6}(?:[A-F0-9]{2})?$`
   */
  BackgroundColor?: string;
  BackgroundVisibility?: Visibility;
  /**
   * @pattern `^#[A-F0-9]{6}(?:[A-F0-9]{2})?$`
   */
  BorderColor?: string;
  BorderStyle?: PanelBorderStyle;
  /**
   * String based length that is composed of value and unit in px
   */
  BorderThickness?: string;
  BorderVisibility?: Visibility;
  /**
   * String based length that is composed of value and unit in px
   */
  GutterSpacing?: string;
  GutterVisibility?: Visibility;
  Title?: PanelTitleOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PanelTitleOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-paneltitleoptions.html}
 */
export type PanelTitleOptions = {
  FontConfiguration?: FontConfiguration;
  HorizontalTextAlignment?: HorizontalTextAlignment;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PaperOrientation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-paperorientation.html}
 */
export type PaperOrientation = "PORTRAIT" | "LANDSCAPE";
/**
 * Type definition for `AWS::QuickSight::Analysis.PaperSize`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-papersize.html}
 */
export type PaperSize =
  | "US_LETTER"
  | "US_LEGAL"
  | "US_TABLOID_LEDGER"
  | "A0"
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "JIS_B4"
  | "JIS_B5";
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parametercontrol.html}
 */
export type ParameterControl = {
  DateTimePicker?: ParameterDateTimePickerControl;
  Dropdown?: ParameterDropDownControl;
  List?: ParameterListControl;
  Slider?: ParameterSliderControl;
  TextArea?: ParameterTextAreaControl;
  TextField?: ParameterTextFieldControl;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterDateTimePickerControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parameterdatetimepickercontrol.html}
 */
export type ParameterDateTimePickerControl = {
  DisplayOptions?: DateTimePickerControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ParameterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  SourceParameterName: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterDeclaration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parameterdeclaration.html}
 */
export type ParameterDeclaration = {
  DateTimeParameterDeclaration?: DateTimeParameterDeclaration;
  DecimalParameterDeclaration?: DecimalParameterDeclaration;
  IntegerParameterDeclaration?: IntegerParameterDeclaration;
  StringParameterDeclaration?: StringParameterDeclaration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterDropDownControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parameterdropdowncontrol.html}
 */
export type ParameterDropDownControl = {
  CascadingControlConfiguration?: CascadingControlConfiguration;
  DisplayOptions?: DropDownControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ParameterControlId: string;
  SelectableValues?: ParameterSelectableValues;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  SourceParameterName: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
  Type?: SheetControlListType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterListControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parameterlistcontrol.html}
 */
export type ParameterListControl = {
  CascadingControlConfiguration?: CascadingControlConfiguration;
  DisplayOptions?: ListControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ParameterControlId: string;
  SelectableValues?: ParameterSelectableValues;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  SourceParameterName: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
  Type?: SheetControlListType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterSelectableValues`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parameterselectablevalues.html}
 */
export type ParameterSelectableValues = {
  LinkToDataSetColumn?: ColumnIdentifier;
  /**
   * @maxLength `50000`
   */
  Values?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterSliderControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parameterslidercontrol.html}
 */
export type ParameterSliderControl = {
  DisplayOptions?: SliderControlDisplayOptions;
  MaximumValue: number;
  MinimumValue: number;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ParameterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  SourceParameterName: string;
  StepSize: number;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterTextAreaControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parametertextareacontrol.html}
 */
export type ParameterTextAreaControl = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Delimiter?: string;
  DisplayOptions?: TextAreaControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ParameterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  SourceParameterName: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterTextFieldControl`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parametertextfieldcontrol.html}
 */
export type ParameterTextFieldControl = {
  DisplayOptions?: TextFieldControlDisplayOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ParameterControlId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  SourceParameterName: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Title: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ParameterValueType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parametervaluetype.html}
 */
export type ParameterValueType = "MULTI_VALUED" | "SINGLE_VALUED";
/**
 * Type definition for `AWS::QuickSight::Analysis.Parameters`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-parameters.html}
 */
export type Parameters = {
  /**
   * @maxLength `100`
   */
  DateTimeParameters?: DateTimeParameter[];
  /**
   * @maxLength `100`
   */
  DecimalParameters?: DecimalParameter[];
  /**
   * @maxLength `100`
   */
  IntegerParameters?: IntegerParameter[];
  /**
   * @maxLength `100`
   */
  StringParameters?: StringParameter[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PercentVisibleRange`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-percentvisiblerange.html}
 */
export type PercentVisibleRange = {
  /**
   * @max `100`
   */
  From?: number;
  /**
   * @max `100`
   */
  To?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PercentageDisplayFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-percentagedisplayformatconfiguration.html}
 */
export type PercentageDisplayFormatConfiguration = {
  DecimalPlacesConfiguration?: DecimalPlacesConfiguration;
  NegativeValueConfiguration?: NegativeValueConfiguration;
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Prefix?: string;
  SeparatorConfiguration?: NumericSeparatorConfiguration;
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Suffix?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PercentileAggregation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-percentileaggregation.html}
 */
export type PercentileAggregation = {
  /**
   * @max `100`
   */
  PercentileValue?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PeriodOverPeriodComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-periodoverperiodcomputation.html}
 */
export type PeriodOverPeriodComputation = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  Name?: string;
  Time?: DimensionField;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PeriodToDateComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-periodtodatecomputation.html}
 */
export type PeriodToDateComputation = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  Name?: string;
  PeriodTimeGranularity?: TimeGranularity;
  Time?: DimensionField;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PieChartAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-piechartaggregatedfieldwells.html}
 */
export type PieChartAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `1`
   */
  SmallMultiples?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PieChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-piechartconfiguration.html}
 */
export type PieChartConfiguration = {
  CategoryLabelOptions?: ChartAxisLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `200`
   */
  ContributionAnalysisDefaults?: ContributionAnalysisDefault[];
  DataLabels?: DataLabelOptions;
  DonutOptions?: DonutOptions;
  FieldWells?: PieChartFieldWells;
  Legend?: LegendOptions;
  SmallMultiplesOptions?: SmallMultiplesOptions;
  SortConfiguration?: PieChartSortConfiguration;
  Tooltip?: TooltipOptions;
  ValueLabelOptions?: ChartAxisLabelOptions;
  VisualPalette?: VisualPalette;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PieChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-piechartfieldwells.html}
 */
export type PieChartFieldWells = {
  PieChartAggregatedFieldWells?: PieChartAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PieChartSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-piechartsortconfiguration.html}
 */
export type PieChartSortConfiguration = {
  CategoryItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
  SmallMultiplesLimitConfiguration?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  SmallMultiplesSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PieChartVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-piechartvisual.html}
 */
export type PieChartVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: PieChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotFieldSortOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivotfieldsortoptions.html}
 */
export type PivotFieldSortOptions = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  SortBy: PivotTableSortBy;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottableaggregatedfieldwells.html}
 */
export type PivotTableAggregatedFieldWells = {
  /**
   * @maxLength `40`
   */
  Columns?: DimensionField[];
  /**
   * @maxLength `40`
   */
  Rows?: DimensionField[];
  /**
   * @maxLength `40`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableCellConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablecellconditionalformatting.html}
 */
export type PivotTableCellConditionalFormatting = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  Scope?: PivotTableConditionalFormattingScope;
  /**
   * @maxLength `3`
   */
  Scopes?: PivotTableConditionalFormattingScope[];
  TextFormat?: TextConditionalFormat;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottableconditionalformatting.html}
 */
export type PivotTableConditionalFormatting = {
  /**
   * @maxLength `100`
   */
  ConditionalFormattingOptions?: PivotTableConditionalFormattingOption[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableConditionalFormattingOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottableconditionalformattingoption.html}
 */
export type PivotTableConditionalFormattingOption = {
  Cell?: PivotTableCellConditionalFormatting;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableConditionalFormattingScope`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottableconditionalformattingscope.html}
 */
export type PivotTableConditionalFormattingScope = {
  Role?: PivotTableConditionalFormattingScopeRole;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableConditionalFormattingScopeRole`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottableconditionalformattingscoperole.html}
 */
export type PivotTableConditionalFormattingScopeRole =
  | "FIELD"
  | "FIELD_TOTAL"
  | "GRAND_TOTAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottableconfiguration.html}
 */
export type PivotTableConfiguration = {
  FieldOptions?: PivotTableFieldOptions;
  FieldWells?: PivotTableFieldWells;
  PaginatedReportOptions?: PivotTablePaginatedReportOptions;
  SortConfiguration?: PivotTableSortConfiguration;
  TableOptions?: PivotTableOptions;
  TotalOptions?: PivotTableTotalOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableDataPathOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottabledatapathoption.html}
 */
export type PivotTableDataPathOption = {
  /**
   * @maxLength `20`
   */
  DataPathList: DataPathValue[];
  /**
   * String based length that is composed of value and unit in px
   */
  Width?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableDataPathType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottabledatapathtype.html}
 */
export type PivotTableDataPathType =
  | "HIERARCHY_ROWS_LAYOUT_COLUMN"
  | "MULTIPLE_ROW_METRICS_COLUMN"
  | "EMPTY_COLUMN_HEADER"
  | "COUNT_METRIC_COLUMN";
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableFieldCollapseState`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablefieldcollapsestate.html}
 */
export type PivotTableFieldCollapseState = "COLLAPSED" | "EXPANDED";
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableFieldCollapseStateOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablefieldcollapsestateoption.html}
 */
export type PivotTableFieldCollapseStateOption = {
  State?: PivotTableFieldCollapseState;
  Target: PivotTableFieldCollapseStateTarget;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableFieldCollapseStateTarget`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablefieldcollapsestatetarget.html}
 */
export type PivotTableFieldCollapseStateTarget = {
  /**
   * @maxLength `20`
   */
  FieldDataPathValues?: DataPathValue[];
  FieldId?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableFieldOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablefieldoption.html}
 */
export type PivotTableFieldOption = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  CustomLabel?: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableFieldOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablefieldoptions.html}
 */
export type PivotTableFieldOptions = {
  CollapseStateOptions?: PivotTableFieldCollapseStateOption[];
  /**
   * @maxLength `100`
   */
  DataPathOptions?: PivotTableDataPathOption[];
  /**
   * @maxLength `100`
   */
  SelectedFieldOptions?: PivotTableFieldOption[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableFieldSubtotalOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablefieldsubtotaloptions.html}
 */
export type PivotTableFieldSubtotalOptions = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablefieldwells.html}
 */
export type PivotTableFieldWells = {
  PivotTableAggregatedFieldWells?: PivotTableAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableMetricPlacement`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablemetricplacement.html}
 */
export type PivotTableMetricPlacement = "ROW" | "COLUMN";
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottableoptions.html}
 */
export type PivotTableOptions = {
  CellStyle?: TableCellStyle;
  CollapsedRowDimensionsVisibility?: Visibility;
  ColumnHeaderStyle?: TableCellStyle;
  ColumnNamesVisibility?: Visibility;
  /**
   * String based length that is composed of value and unit in px
   */
  DefaultCellWidth?: string;
  MetricPlacement?: PivotTableMetricPlacement;
  RowAlternateColorOptions?: RowAlternateColorOptions;
  RowFieldNamesStyle?: TableCellStyle;
  RowHeaderStyle?: TableCellStyle;
  RowsLabelOptions?: PivotTableRowsLabelOptions;
  RowsLayout?: PivotTableRowsLayout;
  SingleMetricVisibility?: Visibility;
  ToggleButtonsVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTablePaginatedReportOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablepaginatedreportoptions.html}
 */
export type PivotTablePaginatedReportOptions = {
  OverflowColumnHeaderVisibility?: Visibility;
  VerticalOverflowVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableRowsLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablerowslabeloptions.html}
 */
export type PivotTableRowsLabelOptions = {
  /**
   * @minLength `1`
   * @maxLength `1024`
   */
  CustomLabel?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableRowsLayout`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablerowslayout.html}
 */
export type PivotTableRowsLayout = "TABULAR" | "HIERARCHY";
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableSortBy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablesortby.html}
 */
export type PivotTableSortBy = {
  Column?: ColumnSort;
  DataPath?: DataPathSort;
  Field?: FieldSort;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablesortconfiguration.html}
 */
export type PivotTableSortConfiguration = {
  /**
   * @maxLength `200`
   */
  FieldSortOptions?: PivotFieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableSubtotalLevel`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablesubtotallevel.html}
 */
export type PivotTableSubtotalLevel = "ALL" | "CUSTOM" | "LAST";
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableTotalOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottabletotaloptions.html}
 */
export type PivotTableTotalOptions = {
  ColumnSubtotalOptions?: SubtotalOptions;
  ColumnTotalOptions?: PivotTotalOptions;
  RowSubtotalOptions?: SubtotalOptions;
  RowTotalOptions?: PivotTotalOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTableVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottablevisual.html}
 */
export type PivotTableVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: PivotTableConfiguration;
  ConditionalFormatting?: PivotTableConditionalFormatting;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PivotTotalOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-pivottotaloptions.html}
 */
export type PivotTotalOptions = {
  CustomLabel?: string;
  MetricHeaderCellStyle?: TableCellStyle;
  Placement?: TableTotalsPlacement;
  ScrollStatus?: TableTotalsScrollStatus;
  /**
   * @maxLength `200`
   */
  TotalAggregationOptions?: TotalAggregationOption[];
  TotalCellStyle?: TableCellStyle;
  TotalsVisibility?: Visibility;
  ValueCellStyle?: TableCellStyle;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PredefinedHierarchy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-predefinedhierarchy.html}
 */
export type PredefinedHierarchy = {
  /**
   * @minLength `1`
   * @maxLength `10`
   */
  Columns: ColumnIdentifier[];
  /**
   * @maxLength `10`
   */
  DrillDownFilters?: DrillDownFilter[];
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  HierarchyId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.PrimaryValueDisplayType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-primaryvaluedisplaytype.html}
 */
export type PrimaryValueDisplayType = "HIDDEN" | "COMPARISON" | "ACTUAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.ProgressBarOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-progressbaroptions.html}
 */
export type ProgressBarOptions = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartaggregatedfieldwells.html}
 */
export type RadarChartAggregatedFieldWells = {
  /**
   * @maxLength `1`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `1`
   */
  Color?: DimensionField[];
  /**
   * @maxLength `20`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartAreaStyleSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartareastylesettings.html}
 */
export type RadarChartAreaStyleSettings = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartAxesRangeScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartaxesrangescale.html}
 */
export type RadarChartAxesRangeScale = "AUTO" | "INDEPENDENT" | "SHARED";
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartconfiguration.html}
 */
export type RadarChartConfiguration = {
  AlternateBandColorsVisibility?: Visibility;
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  AlternateBandEvenColor?: string;
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  AlternateBandOddColor?: string;
  AxesRangeScale?: RadarChartAxesRangeScale;
  BaseSeriesSettings?: RadarChartSeriesSettings;
  CategoryAxis?: AxisDisplayOptions;
  CategoryLabelOptions?: ChartAxisLabelOptions;
  ColorAxis?: AxisDisplayOptions;
  ColorLabelOptions?: ChartAxisLabelOptions;
  FieldWells?: RadarChartFieldWells;
  Legend?: LegendOptions;
  Shape?: RadarChartShape;
  SortConfiguration?: RadarChartSortConfiguration;
  /**
   * @min `-360`
   * @max `360`
   */
  StartAngle?: number;
  VisualPalette?: VisualPalette;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartfieldwells.html}
 */
export type RadarChartFieldWells = {
  RadarChartAggregatedFieldWells?: RadarChartAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartSeriesSettings`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartseriessettings.html}
 */
export type RadarChartSeriesSettings = {
  AreaStyleSettings?: RadarChartAreaStyleSettings;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartShape`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartshape.html}
 */
export type RadarChartShape = "CIRCLE" | "POLYGON";
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartsortconfiguration.html}
 */
export type RadarChartSortConfiguration = {
  CategoryItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
  ColorItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  ColorSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RadarChartVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-radarchartvisual.html}
 */
export type RadarChartVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: RadarChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RangeEndsLabelType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-rangeendslabeltype.html}
 */
export type RangeEndsLabelType = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLine`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referenceline.html}
 */
export type ReferenceLine = {
  DataConfiguration: ReferenceLineDataConfiguration;
  LabelConfiguration?: ReferenceLineLabelConfiguration;
  Status?: WidgetStatus;
  StyleConfiguration?: ReferenceLineStyleConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineCustomLabelConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinecustomlabelconfiguration.html}
 */
export type ReferenceLineCustomLabelConfiguration = {
  /**
   * @pattern `.*\S.*`
   */
  CustomLabel: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineDataConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinedataconfiguration.html}
 */
export type ReferenceLineDataConfiguration = {
  AxisBinding?: AxisBinding;
  DynamicConfiguration?: ReferenceLineDynamicDataConfiguration;
  SeriesType?: ReferenceLineSeriesType;
  StaticConfiguration?: ReferenceLineStaticDataConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineDynamicDataConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinedynamicdataconfiguration.html}
 */
export type ReferenceLineDynamicDataConfiguration = {
  Calculation: NumericalAggregationFunction;
  Column: ColumnIdentifier;
  MeasureAggregationFunction?: AggregationFunction;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineLabelConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinelabelconfiguration.html}
 */
export type ReferenceLineLabelConfiguration = {
  CustomLabelConfiguration?: ReferenceLineCustomLabelConfiguration;
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  FontColor?: string;
  FontConfiguration?: FontConfiguration;
  HorizontalPosition?: ReferenceLineLabelHorizontalPosition;
  ValueLabelConfiguration?: ReferenceLineValueLabelConfiguration;
  VerticalPosition?: ReferenceLineLabelVerticalPosition;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineLabelHorizontalPosition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinelabelhorizontalposition.html}
 */
export type ReferenceLineLabelHorizontalPosition = "LEFT" | "CENTER" | "RIGHT";
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineLabelVerticalPosition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinelabelverticalposition.html}
 */
export type ReferenceLineLabelVerticalPosition = "ABOVE" | "BELOW";
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLinePatternType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinepatterntype.html}
 */
export type ReferenceLinePatternType = "SOLID" | "DASHED" | "DOTTED";
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineSeriesType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelineseriestype.html}
 */
export type ReferenceLineSeriesType = "BAR" | "LINE";
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineStaticDataConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinestaticdataconfiguration.html}
 */
export type ReferenceLineStaticDataConfiguration = {
  Value: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineStyleConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinestyleconfiguration.html}
 */
export type ReferenceLineStyleConfiguration = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
  Pattern?: ReferenceLinePatternType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineValueLabelConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinevaluelabelconfiguration.html}
 */
export type ReferenceLineValueLabelConfiguration = {
  FormatConfiguration?: NumericFormatConfiguration;
  RelativePosition?: ReferenceLineValueLabelRelativePosition;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ReferenceLineValueLabelRelativePosition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-referencelinevaluelabelrelativeposition.html}
 */
export type ReferenceLineValueLabelRelativePosition =
  | "BEFORE_CUSTOM_LABEL"
  | "AFTER_CUSTOM_LABEL";
/**
 * Type definition for `AWS::QuickSight::Analysis.RelativeDateTimeControlDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-relativedatetimecontroldisplayoptions.html}
 */
export type RelativeDateTimeControlDisplayOptions = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  DateTimeFormat?: string;
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  TitleOptions?: LabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RelativeDateType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-relativedatetype.html}
 */
export type RelativeDateType = "PREVIOUS" | "THIS" | "LAST" | "NOW" | "NEXT";
/**
 * Type definition for `AWS::QuickSight::Analysis.RelativeDatesFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-relativedatesfilter.html}
 */
export type RelativeDatesFilter = {
  AnchorDateConfiguration: AnchorDateConfiguration;
  Column: ColumnIdentifier;
  ExcludePeriodConfiguration?: ExcludePeriodConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterId: string;
  MinimumGranularity?: TimeGranularity;
  NullOption: FilterNullOption;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  ParameterName?: string;
  RelativeDateType: RelativeDateType;
  RelativeDateValue?: number;
  TimeGranularity: TimeGranularity;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RelativeFontSize`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-relativefontsize.html}
 */
export type RelativeFontSize =
  | "EXTRA_SMALL"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "EXTRA_LARGE";
/**
 * Type definition for `AWS::QuickSight::Analysis.ResizeOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-resizeoption.html}
 */
export type ResizeOption = "FIXED" | "RESPONSIVE";
/**
 * Type definition for `AWS::QuickSight::Analysis.ResourcePermission`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-resourcepermission.html}
 */
export type ResourcePermission = {
  /**
   * @minLength `1`
   * @maxLength `20`
   */
  Actions: string[];
  /**
   * @minLength `1`
   * @maxLength `256`
   */
  Principal: string;
  Resource?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ResourceStatus`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-resourcestatus.html}
 */
export type ResourceStatus =
  | "CREATION_IN_PROGRESS"
  | "CREATION_SUCCESSFUL"
  | "CREATION_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_SUCCESSFUL"
  | "UPDATE_FAILED"
  | "DELETED";
/**
 * Type definition for `AWS::QuickSight::Analysis.RollingDateConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-rollingdateconfiguration.html}
 */
export type RollingDateConfiguration = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  DataSetIdentifier?: string;
  /**
   * @minLength `1`
   * @maxLength `4096`
   */
  Expression: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.RowAlternateColorOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-rowalternatecoloroptions.html}
 */
export type RowAlternateColorOptions = {
  /**
   * @maxLength `1`
   */
  RowAlternateColors?: string[];
  Status?: WidgetStatus;
  UsePrimaryBackgroundColor?: WidgetStatus;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SameSheetTargetVisualConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-samesheettargetvisualconfiguration.html}
 */
export type SameSheetTargetVisualConfiguration = {
  TargetVisualOptions?: TargetVisualOptions;
  /**
   * @minLength `1`
   * @maxLength `50`
   */
  TargetVisuals?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SankeyDiagramAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sankeydiagramaggregatedfieldwells.html}
 */
export type SankeyDiagramAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Destination?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Source?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Weight?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SankeyDiagramChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sankeydiagramchartconfiguration.html}
 */
export type SankeyDiagramChartConfiguration = {
  DataLabels?: DataLabelOptions;
  FieldWells?: SankeyDiagramFieldWells;
  SortConfiguration?: SankeyDiagramSortConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SankeyDiagramFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sankeydiagramfieldwells.html}
 */
export type SankeyDiagramFieldWells = {
  SankeyDiagramAggregatedFieldWells?: SankeyDiagramAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SankeyDiagramSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sankeydiagramsortconfiguration.html}
 */
export type SankeyDiagramSortConfiguration = {
  DestinationItemsLimit?: ItemsLimitConfiguration;
  SourceItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  WeightSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SankeyDiagramVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sankeydiagramvisual.html}
 */
export type SankeyDiagramVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: SankeyDiagramChartConfiguration;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ScatterPlotCategoricallyAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-scatterplotcategoricallyaggregatedfieldwells.html}
 */
export type ScatterPlotCategoricallyAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Label?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Size?: MeasureField[];
  /**
   * @maxLength `200`
   */
  XAxis?: MeasureField[];
  /**
   * @maxLength `200`
   */
  YAxis?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ScatterPlotConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-scatterplotconfiguration.html}
 */
export type ScatterPlotConfiguration = {
  DataLabels?: DataLabelOptions;
  FieldWells?: ScatterPlotFieldWells;
  Legend?: LegendOptions;
  Tooltip?: TooltipOptions;
  VisualPalette?: VisualPalette;
  XAxisDisplayOptions?: AxisDisplayOptions;
  XAxisLabelOptions?: ChartAxisLabelOptions;
  YAxisDisplayOptions?: AxisDisplayOptions;
  YAxisLabelOptions?: ChartAxisLabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ScatterPlotFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-scatterplotfieldwells.html}
 */
export type ScatterPlotFieldWells = {
  ScatterPlotCategoricallyAggregatedFieldWells?: ScatterPlotCategoricallyAggregatedFieldWells;
  ScatterPlotUnaggregatedFieldWells?: ScatterPlotUnaggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ScatterPlotUnaggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-scatterplotunaggregatedfieldwells.html}
 */
export type ScatterPlotUnaggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Category?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Label?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Size?: MeasureField[];
  /**
   * @maxLength `200`
   */
  XAxis?: DimensionField[];
  /**
   * @maxLength `200`
   */
  YAxis?: DimensionField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ScatterPlotVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-scatterplotvisual.html}
 */
export type ScatterPlotVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: ScatterPlotConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ScrollBarOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-scrollbaroptions.html}
 */
export type ScrollBarOptions = {
  Visibility?: Visibility;
  VisibleRange?: VisibleRangeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SecondaryValueOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-secondaryvalueoptions.html}
 */
export type SecondaryValueOptions = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionAfterPageBreak`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionafterpagebreak.html}
 */
export type SectionAfterPageBreak = {
  Status?: SectionPageBreakStatus;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionBasedLayoutCanvasSizeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionbasedlayoutcanvassizeoptions.html}
 */
export type SectionBasedLayoutCanvasSizeOptions = {
  PaperCanvasSizeOptions?: SectionBasedLayoutPaperCanvasSizeOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionBasedLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionbasedlayoutconfiguration.html}
 */
export type SectionBasedLayoutConfiguration = {
  /**
   * @maxLength `28`
   */
  BodySections: BodySectionConfiguration[];
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptions;
  /**
   * @maxLength `1`
   */
  FooterSections: HeaderFooterSectionConfiguration[];
  /**
   * @maxLength `1`
   */
  HeaderSections: HeaderFooterSectionConfiguration[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionBasedLayoutPaperCanvasSizeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionbasedlayoutpapercanvassizeoptions.html}
 */
export type SectionBasedLayoutPaperCanvasSizeOptions = {
  PaperMargin?: Spacing;
  PaperOrientation?: PaperOrientation;
  PaperSize?: PaperSize;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionlayoutconfiguration.html}
 */
export type SectionLayoutConfiguration = {
  FreeFormLayout: FreeFormSectionLayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionPageBreakConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionpagebreakconfiguration.html}
 */
export type SectionPageBreakConfiguration = {
  After?: SectionAfterPageBreak;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionPageBreakStatus`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionpagebreakstatus.html}
 */
export type SectionPageBreakStatus = "ENABLED" | "DISABLED";
/**
 * Type definition for `AWS::QuickSight::Analysis.SectionStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sectionstyle.html}
 */
export type SectionStyle = {
  /**
   * String based length that is composed of value and unit in px
   */
  Height?: string;
  Padding?: Spacing;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SelectAllValueOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-selectallvalueoptions.html}
 */
export type SelectAllValueOptions = "ALL_VALUES";
/**
 * Type definition for `AWS::QuickSight::Analysis.SelectedFieldOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-selectedfieldoptions.html}
 */
export type SelectedFieldOptions = "ALL_FIELDS";
/**
 * Type definition for `AWS::QuickSight::Analysis.SelectedSheetsFilterScopeConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-selectedsheetsfilterscopeconfiguration.html}
 */
export type SelectedSheetsFilterScopeConfiguration = {
  /**
   * @minLength `1`
   * @maxLength `50`
   */
  SheetVisualScopingConfigurations?: SheetVisualScopingConfiguration[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SelectedTooltipType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-selectedtooltiptype.html}
 */
export type SelectedTooltipType = "BASIC" | "DETAILED";
/**
 * Type definition for `AWS::QuickSight::Analysis.SeriesItem`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-seriesitem.html}
 */
export type SeriesItem = {
  DataFieldSeriesItem?: DataFieldSeriesItem;
  FieldSeriesItem?: FieldSeriesItem;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SetParameterValueConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-setparametervalueconfiguration.html}
 */
export type SetParameterValueConfiguration = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  DestinationParameterName: string;
  Value: DestinationParameterValueConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ShapeConditionalFormat`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-shapeconditionalformat.html}
 */
export type ShapeConditionalFormat = {
  BackgroundColor: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.Sheet`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheet.html}
 */
export type Sheet = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Name?: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SheetId?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetContentType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetcontenttype.html}
 */
export type SheetContentType = "PAGINATED" | "INTERACTIVE";
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetControlDateTimePickerType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetcontroldatetimepickertype.html}
 */
export type SheetControlDateTimePickerType = "SINGLE_VALUED" | "DATE_RANGE";
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetControlInfoIconLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetcontrolinfoiconlabeloptions.html}
 */
export type SheetControlInfoIconLabelOptions = {
  /**
   * @minLength `1`
   * @maxLength `100`
   */
  InfoIconText?: string;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetControlLayout`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetcontrollayout.html}
 */
export type SheetControlLayout = {
  Configuration: SheetControlLayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetControlLayoutConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetcontrollayoutconfiguration.html}
 */
export type SheetControlLayoutConfiguration = {
  GridLayout?: GridLayoutConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetControlListType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetcontrollisttype.html}
 */
export type SheetControlListType = "MULTI_SELECT" | "SINGLE_SELECT";
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetControlSliderType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetcontrolslidertype.html}
 */
export type SheetControlSliderType = "SINGLE_POINT" | "RANGE";
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetDefinition`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetdefinition.html}
 */
export type SheetDefinition = {
  ContentType?: SheetContentType;
  /**
   * @minLength `1`
   * @maxLength `1024`
   */
  Description?: string;
  /**
   * @maxLength `200`
   */
  FilterControls?: FilterControl[];
  /**
   * @minLength `1`
   * @maxLength `1`
   */
  Layouts?: Layout[];
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  Name?: string;
  /**
   * @maxLength `200`
   */
  ParameterControls?: ParameterControl[];
  /**
   * @maxLength `1`
   */
  SheetControlLayouts?: SheetControlLayout[];
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SheetId: string;
  /**
   * @maxLength `100`
   */
  TextBoxes?: SheetTextBox[];
  /**
   * @minLength `1`
   * @maxLength `1024`
   */
  Title?: string;
  /**
   * @maxLength `50`
   */
  Visuals?: Visual[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetElementConfigurationOverrides`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetelementconfigurationoverrides.html}
 */
export type SheetElementConfigurationOverrides = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetElementRenderingRule`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetelementrenderingrule.html}
 */
export type SheetElementRenderingRule = {
  ConfigurationOverrides: SheetElementConfigurationOverrides;
  /**
   * @minLength `1`
   * @maxLength `4096`
   */
  Expression: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetTextBox`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheettextbox.html}
 */
export type SheetTextBox = {
  /**
   * @maxLength `150000`
   */
  Content?: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SheetTextBoxId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SheetVisualScopingConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sheetvisualscopingconfiguration.html}
 */
export type SheetVisualScopingConfiguration = {
  Scope: FilterVisualScope;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  SheetId: string;
  /**
   * @maxLength `50`
   */
  VisualIds?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ShortFormatText`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-shortformattext.html}
 */
export type ShortFormatText = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  PlainText?: string;
  /**
   * @minLength `1`
   * @maxLength `1024`
   */
  RichText?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SimpleAttributeAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-simpleattributeaggregationfunction.html}
 */
export type SimpleAttributeAggregationFunction = "UNIQUE_VALUE";
/**
 * Type definition for `AWS::QuickSight::Analysis.SimpleClusterMarker`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-simpleclustermarker.html}
 */
export type SimpleClusterMarker = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SimpleNumericalAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-simplenumericalaggregationfunction.html}
 */
export type SimpleNumericalAggregationFunction =
  | "SUM"
  | "AVERAGE"
  | "MIN"
  | "MAX"
  | "COUNT"
  | "DISTINCT_COUNT"
  | "VAR"
  | "VARP"
  | "STDEV"
  | "STDEVP"
  | "MEDIAN";
/**
 * Type definition for `AWS::QuickSight::Analysis.SimpleTotalAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-simpletotalaggregationfunction.html}
 */
export type SimpleTotalAggregationFunction =
  | "DEFAULT"
  | "SUM"
  | "AVERAGE"
  | "MIN"
  | "MAX"
  | "NONE";
/**
 * Type definition for `AWS::QuickSight::Analysis.SliderControlDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-slidercontroldisplayoptions.html}
 */
export type SliderControlDisplayOptions = {
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  TitleOptions?: LabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SmallMultiplesAxisPlacement`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-smallmultiplesaxisplacement.html}
 */
export type SmallMultiplesAxisPlacement = "OUTSIDE" | "INSIDE";
/**
 * Type definition for `AWS::QuickSight::Analysis.SmallMultiplesAxisProperties`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-smallmultiplesaxisproperties.html}
 */
export type SmallMultiplesAxisProperties = {
  Placement?: SmallMultiplesAxisPlacement;
  Scale?: SmallMultiplesAxisScale;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SmallMultiplesAxisScale`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-smallmultiplesaxisscale.html}
 */
export type SmallMultiplesAxisScale = "SHARED" | "INDEPENDENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.SmallMultiplesOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-smallmultiplesoptions.html}
 */
export type SmallMultiplesOptions = {
  /**
   * @min `1`
   * @max `10`
   */
  MaxVisibleColumns?: number;
  /**
   * @min `1`
   * @max `10`
   */
  MaxVisibleRows?: number;
  PanelConfiguration?: PanelConfiguration;
  XAxis?: SmallMultiplesAxisProperties;
  YAxis?: SmallMultiplesAxisProperties;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SortDirection`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-sortdirection.html}
 */
export type SortDirection = "ASC" | "DESC";
/**
 * Type definition for `AWS::QuickSight::Analysis.Spacing`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-spacing.html}
 */
export type Spacing = {
  /**
   * String based length that is composed of value and unit
   */
  Bottom?: string;
  /**
   * String based length that is composed of value and unit
   */
  Left?: string;
  /**
   * String based length that is composed of value and unit
   */
  Right?: string;
  /**
   * String based length that is composed of value and unit
   */
  Top?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.SpecialValue`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-specialvalue.html}
 */
export type SpecialValue = "EMPTY" | "NULL" | "OTHER";
/**
 * Type definition for `AWS::QuickSight::Analysis.StringDefaultValues`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-stringdefaultvalues.html}
 */
export type StringDefaultValues = {
  DynamicValue?: DynamicDefaultValue;
  /**
   * @maxLength `50000`
   */
  StaticValues?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.StringFormatConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-stringformatconfiguration.html}
 */
export type StringFormatConfiguration = {
  NullValueFormatConfiguration?: NullValueFormatConfiguration;
  NumericFormatConfiguration?: NumericFormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.StringParameter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-stringparameter.html}
 */
export type StringParameter = {
  /**
   * @pattern `.*\S.*`
   */
  Name: string;
  Values: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.StringParameterDeclaration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-stringparameterdeclaration.html}
 */
export type StringParameterDeclaration = {
  DefaultValues?: StringDefaultValues;
  /**
   * @maxLength `150`
   */
  MappedDataSetParameters?: MappedDataSetParameter[];
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  Name: string;
  ParameterValueType: ParameterValueType;
  ValueWhenUnset?: StringValueWhenUnsetConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.StringValueWhenUnsetConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-stringvaluewhenunsetconfiguration.html}
 */
export type StringValueWhenUnsetConfiguration = {
  CustomValue?: string;
  ValueWhenUnsetOption?: ValueWhenUnsetOption;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.StyledCellType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-styledcelltype.html}
 */
export type StyledCellType = "TOTAL" | "METRIC_HEADER" | "VALUE";
/**
 * Type definition for `AWS::QuickSight::Analysis.SubtotalOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-subtotaloptions.html}
 */
export type SubtotalOptions = {
  CustomLabel?: string;
  FieldLevel?: PivotTableSubtotalLevel;
  /**
   * @maxLength `100`
   */
  FieldLevelOptions?: PivotTableFieldSubtotalOptions[];
  MetricHeaderCellStyle?: TableCellStyle;
  /**
   * @maxLength `3`
   */
  StyleTargets?: TableStyleTarget[];
  TotalCellStyle?: TableCellStyle;
  TotalsVisibility?: Visibility;
  ValueCellStyle?: TableCellStyle;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableaggregatedfieldwells.html}
 */
export type TableAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  GroupBy?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableBorderOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableborderoptions.html}
 */
export type TableBorderOptions = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  Color?: string;
  Style?: TableBorderStyle;
  /**
   * @min `1`
   * @max `4`
   */
  Thickness?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableBorderStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableborderstyle.html}
 */
export type TableBorderStyle = "NONE" | "SOLID";
/**
 * Type definition for `AWS::QuickSight::Analysis.TableCellConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablecellconditionalformatting.html}
 */
export type TableCellConditionalFormatting = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  TextFormat?: TextConditionalFormat;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableCellImageScalingConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablecellimagescalingconfiguration.html}
 */
export type TableCellImageScalingConfiguration =
  | "FIT_TO_CELL_HEIGHT"
  | "FIT_TO_CELL_WIDTH"
  | "DO_NOT_SCALE";
/**
 * Type definition for `AWS::QuickSight::Analysis.TableCellImageSizingConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablecellimagesizingconfiguration.html}
 */
export type TableCellImageSizingConfiguration = {
  TableCellImageScalingConfiguration?: TableCellImageScalingConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableCellStyle`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablecellstyle.html}
 */
export type TableCellStyle = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  BackgroundColor?: string;
  Border?: GlobalTableBorderOptions;
  FontConfiguration?: FontConfiguration;
  /**
   * @min `8`
   * @max `500`
   */
  Height?: number;
  HorizontalTextAlignment?: HorizontalTextAlignment;
  TextWrap?: TextWrap;
  VerticalTextAlignment?: VerticalTextAlignment;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableconditionalformatting.html}
 */
export type TableConditionalFormatting = {
  /**
   * @maxLength `100`
   */
  ConditionalFormattingOptions?: TableConditionalFormattingOption[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableConditionalFormattingOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableconditionalformattingoption.html}
 */
export type TableConditionalFormattingOption = {
  Cell?: TableCellConditionalFormatting;
  Row?: TableRowConditionalFormatting;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableconfiguration.html}
 */
export type TableConfiguration = {
  FieldOptions?: TableFieldOptions;
  FieldWells?: TableFieldWells;
  PaginatedReportOptions?: TablePaginatedReportOptions;
  SortConfiguration?: TableSortConfiguration;
  /**
   * @maxLength `200`
   */
  TableInlineVisualizations?: TableInlineVisualization[];
  TableOptions?: TableOptions;
  TotalOptions?: TotalOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldCustomIconContent`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldcustomiconcontent.html}
 */
export type TableFieldCustomIconContent = {
  Icon?: TableFieldIconSetType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldCustomTextContent`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldcustomtextcontent.html}
 */
export type TableFieldCustomTextContent = {
  FontConfiguration: FontConfiguration;
  Value?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldIconSetType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldiconsettype.html}
 */
export type TableFieldIconSetType = "LINK";
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldImageConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldimageconfiguration.html}
 */
export type TableFieldImageConfiguration = {
  SizingOptions?: TableCellImageSizingConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldLinkConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldlinkconfiguration.html}
 */
export type TableFieldLinkConfiguration = {
  Content: TableFieldLinkContentConfiguration;
  Target: URLTargetConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldLinkContentConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldlinkcontentconfiguration.html}
 */
export type TableFieldLinkContentConfiguration = {
  CustomIconContent?: TableFieldCustomIconContent;
  CustomTextContent?: TableFieldCustomTextContent;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldoption.html}
 */
export type TableFieldOption = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   */
  CustomLabel?: string;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  URLStyling?: TableFieldURLConfiguration;
  Visibility?: Visibility;
  /**
   * String based length that is composed of value and unit in px
   */
  Width?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldoptions.html}
 */
export type TableFieldOptions = {
  /**
   * @maxLength `200`
   */
  Order?: string[];
  PinnedFieldOptions?: TablePinnedFieldOptions;
  /**
   * @maxLength `100`
   */
  SelectedFieldOptions?: TableFieldOption[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldURLConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldurlconfiguration.html}
 */
export type TableFieldURLConfiguration = {
  ImageConfiguration?: TableFieldImageConfiguration;
  LinkConfiguration?: TableFieldLinkConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablefieldwells.html}
 */
export type TableFieldWells = {
  TableAggregatedFieldWells?: TableAggregatedFieldWells;
  TableUnaggregatedFieldWells?: TableUnaggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableInlineVisualization`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableinlinevisualization.html}
 */
export type TableInlineVisualization = {
  DataBars?: DataBarsOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableoptions.html}
 */
export type TableOptions = {
  CellStyle?: TableCellStyle;
  HeaderStyle?: TableCellStyle;
  Orientation?: TableOrientation;
  RowAlternateColorOptions?: RowAlternateColorOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableOrientation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableorientation.html}
 */
export type TableOrientation = "VERTICAL" | "HORIZONTAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.TablePaginatedReportOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablepaginatedreportoptions.html}
 */
export type TablePaginatedReportOptions = {
  OverflowColumnHeaderVisibility?: Visibility;
  VerticalOverflowVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TablePinnedFieldOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablepinnedfieldoptions.html}
 */
export type TablePinnedFieldOptions = {
  /**
   * @maxLength `201`
   */
  PinnedLeftFields?: string[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableRowConditionalFormatting`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablerowconditionalformatting.html}
 */
export type TableRowConditionalFormatting = {
  BackgroundColor?: ConditionalFormattingColor;
  TextColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableSideBorderOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablesideborderoptions.html}
 */
export type TableSideBorderOptions = {
  Bottom?: TableBorderOptions;
  InnerHorizontal?: TableBorderOptions;
  InnerVertical?: TableBorderOptions;
  Left?: TableBorderOptions;
  Right?: TableBorderOptions;
  Top?: TableBorderOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablesortconfiguration.html}
 */
export type TableSortConfiguration = {
  PaginationConfiguration?: PaginationConfiguration;
  /**
   * @maxLength `100`
   */
  RowSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableStyleTarget`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablestyletarget.html}
 */
export type TableStyleTarget = {
  CellType: StyledCellType;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableTotalsPlacement`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tabletotalsplacement.html}
 */
export type TableTotalsPlacement = "START" | "END" | "AUTO";
/**
 * Type definition for `AWS::QuickSight::Analysis.TableTotalsScrollStatus`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tabletotalsscrollstatus.html}
 */
export type TableTotalsScrollStatus = "PINNED" | "SCROLLED";
/**
 * Type definition for `AWS::QuickSight::Analysis.TableUnaggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tableunaggregatedfieldwells.html}
 */
export type TableUnaggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Values?: UnaggregatedField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TableVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tablevisual.html}
 */
export type TableVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: TableConfiguration;
  ConditionalFormatting?: TableConditionalFormatting;
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tag.html}
 */
export type Tag = {
  /**
   * @minLength `1`
   * @maxLength `128`
   */
  Key: string;
  /**
   * @minLength `1`
   * @maxLength `256`
   */
  Value: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TargetVisualOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-targetvisualoptions.html}
 */
export type TargetVisualOptions = "ALL_VISUALS";
/**
 * Type definition for `AWS::QuickSight::Analysis.TextAreaControlDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-textareacontroldisplayoptions.html}
 */
export type TextAreaControlDisplayOptions = {
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  PlaceholderOptions?: TextControlPlaceholderOptions;
  TitleOptions?: LabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TextConditionalFormat`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-textconditionalformat.html}
 */
export type TextConditionalFormat = {
  BackgroundColor?: ConditionalFormattingColor;
  Icon?: ConditionalFormattingIcon;
  TextColor?: ConditionalFormattingColor;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TextControlPlaceholderOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-textcontrolplaceholderoptions.html}
 */
export type TextControlPlaceholderOptions = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TextFieldControlDisplayOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-textfieldcontroldisplayoptions.html}
 */
export type TextFieldControlDisplayOptions = {
  InfoIconLabelOptions?: SheetControlInfoIconLabelOptions;
  PlaceholderOptions?: TextControlPlaceholderOptions;
  TitleOptions?: LabelOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TextWrap`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-textwrap.html}
 */
export type TextWrap = "NONE" | "WRAP";
/**
 * Type definition for `AWS::QuickSight::Analysis.ThousandSeparatorOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-thousandseparatoroptions.html}
 */
export type ThousandSeparatorOptions = {
  Symbol?: NumericSeparatorSymbol;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TimeBasedForecastProperties`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-timebasedforecastproperties.html}
 */
export type TimeBasedForecastProperties = {
  LowerBoundary?: number;
  /**
   * @max `1000`
   */
  PeriodsBackward?: number;
  /**
   * @min `1`
   * @max `1000`
   */
  PeriodsForward?: number;
  /**
   * @min `50`
   * @max `95`
   */
  PredictionInterval?: number;
  /**
   * @min `1`
   * @max `180`
   */
  Seasonality?: number;
  UpperBoundary?: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TimeEqualityFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-timeequalityfilter.html}
 */
export type TimeEqualityFilter = {
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterId: string;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  ParameterName?: string;
  RollingDate?: RollingDateConfiguration;
  TimeGranularity?: TimeGranularity;
  Value?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TimeGranularity`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-timegranularity.html}
 */
export type TimeGranularity =
  | "YEAR"
  | "QUARTER"
  | "MONTH"
  | "WEEK"
  | "DAY"
  | "HOUR"
  | "MINUTE"
  | "SECOND"
  | "MILLISECOND";
/**
 * Type definition for `AWS::QuickSight::Analysis.TimeRangeDrillDownFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-timerangedrilldownfilter.html}
 */
export type TimeRangeDrillDownFilter = {
  Column: ColumnIdentifier;
  RangeMaximum: string;
  RangeMinimum: string;
  TimeGranularity: TimeGranularity;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TimeRangeFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-timerangefilter.html}
 */
export type TimeRangeFilter = {
  Column: ColumnIdentifier;
  ExcludePeriodConfiguration?: ExcludePeriodConfiguration;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterId: string;
  IncludeMaximum?: boolean;
  IncludeMinimum?: boolean;
  NullOption: FilterNullOption;
  RangeMaximumValue?: TimeRangeFilterValue;
  RangeMinimumValue?: TimeRangeFilterValue;
  TimeGranularity?: TimeGranularity;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TimeRangeFilterValue`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-timerangefiltervalue.html}
 */
export type TimeRangeFilterValue = {
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  Parameter?: string;
  RollingDate?: RollingDateConfiguration;
  StaticValue?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TooltipItem`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tooltipitem.html}
 */
export type TooltipItem = {
  ColumnTooltipItem?: ColumnTooltipItem;
  FieldTooltipItem?: FieldTooltipItem;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TooltipOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tooltipoptions.html}
 */
export type TooltipOptions = {
  FieldBasedTooltip?: FieldBasedTooltip;
  SelectedTooltipType?: SelectedTooltipType;
  TooltipVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TooltipTitleType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-tooltiptitletype.html}
 */
export type TooltipTitleType = "NONE" | "PRIMARY_VALUE";
/**
 * Type definition for `AWS::QuickSight::Analysis.TopBottomComputationType`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-topbottomcomputationtype.html}
 */
export type TopBottomComputationType = "TOP" | "BOTTOM";
/**
 * Type definition for `AWS::QuickSight::Analysis.TopBottomFilter`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-topbottomfilter.html}
 */
export type TopBottomFilter = {
  /**
   * @maxLength `100`
   */
  AggregationSortConfigurations: AggregationSortConfiguration[];
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  FilterId: string;
  Limit?: number;
  /**
   * @minLength `1`
   * @maxLength `2048`
   * @pattern `^[a-zA-Z0-9]+$`
   */
  ParameterName?: string;
  TimeGranularity?: TimeGranularity;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TopBottomMoversComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-topbottommoverscomputation.html}
 */
export type TopBottomMoversComputation = {
  Category?: DimensionField;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  /**
   * @min `1`
   * @max `20`
   */
  MoverSize?: number;
  Name?: string;
  SortOrder?: TopBottomSortOrder;
  Time?: DimensionField;
  Type: TopBottomComputationType;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TopBottomRankedComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-topbottomrankedcomputation.html}
 */
export type TopBottomRankedComputation = {
  Category?: DimensionField;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  Name?: string;
  /**
   * @min `1`
   * @max `20`
   */
  ResultSize?: number;
  Type: TopBottomComputationType;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TopBottomSortOrder`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-topbottomsortorder.html}
 */
export type TopBottomSortOrder = "PERCENT_DIFFERENCE" | "ABSOLUTE_DIFFERENCE";
/**
 * Type definition for `AWS::QuickSight::Analysis.TotalAggregationComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-totalaggregationcomputation.html}
 */
export type TotalAggregationComputation = {
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  Name?: string;
  Value?: MeasureField;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TotalAggregationFunction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-totalaggregationfunction.html}
 */
export type TotalAggregationFunction = {
  SimpleTotalAggregationFunction?: SimpleTotalAggregationFunction;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TotalAggregationOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-totalaggregationoption.html}
 */
export type TotalAggregationOption = {
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  TotalAggregationFunction: TotalAggregationFunction;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TotalOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-totaloptions.html}
 */
export type TotalOptions = {
  CustomLabel?: string;
  Placement?: TableTotalsPlacement;
  ScrollStatus?: TableTotalsScrollStatus;
  /**
   * @maxLength `200`
   */
  TotalAggregationOptions?: TotalAggregationOption[];
  TotalCellStyle?: TableCellStyle;
  TotalsVisibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TreeMapAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-treemapaggregatedfieldwells.html}
 */
export type TreeMapAggregatedFieldWells = {
  /**
   * @maxLength `1`
   */
  Colors?: MeasureField[];
  /**
   * @maxLength `1`
   */
  Groups?: DimensionField[];
  /**
   * @maxLength `1`
   */
  Sizes?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TreeMapConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-treemapconfiguration.html}
 */
export type TreeMapConfiguration = {
  ColorLabelOptions?: ChartAxisLabelOptions;
  ColorScale?: ColorScale;
  DataLabels?: DataLabelOptions;
  FieldWells?: TreeMapFieldWells;
  GroupLabelOptions?: ChartAxisLabelOptions;
  Legend?: LegendOptions;
  SizeLabelOptions?: ChartAxisLabelOptions;
  SortConfiguration?: TreeMapSortConfiguration;
  Tooltip?: TooltipOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TreeMapFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-treemapfieldwells.html}
 */
export type TreeMapFieldWells = {
  TreeMapAggregatedFieldWells?: TreeMapAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TreeMapSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-treemapsortconfiguration.html}
 */
export type TreeMapSortConfiguration = {
  TreeMapGroupItemsLimitConfiguration?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  TreeMapSort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TreeMapVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-treemapvisual.html}
 */
export type TreeMapVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: TreeMapConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.TrendArrowOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-trendarrowoptions.html}
 */
export type TrendArrowOptions = {
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.URLTargetConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-urltargetconfiguration.html}
 */
export type URLTargetConfiguration = "NEW_TAB" | "NEW_WINDOW" | "SAME_TAB";
/**
 * Type definition for `AWS::QuickSight::Analysis.UnaggregatedField`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-unaggregatedfield.html}
 */
export type UnaggregatedField = {
  Column: ColumnIdentifier;
  /**
   * @minLength `1`
   * @maxLength `512`
   */
  FieldId: string;
  FormatConfiguration?: FormatConfiguration;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.UniqueValuesComputation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-uniquevaluescomputation.html}
 */
export type UniqueValuesComputation = {
  Category?: DimensionField;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  ComputationId: string;
  Name?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ValidationStrategy`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-validationstrategy.html}
 */
export type ValidationStrategy = {
  Mode: ValidationStrategyMode;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.ValidationStrategyMode`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-validationstrategymode.html}
 */
export type ValidationStrategyMode = "STRICT" | "LENIENT";
/**
 * Type definition for `AWS::QuickSight::Analysis.ValueWhenUnsetOption`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-valuewhenunsetoption.html}
 */
export type ValueWhenUnsetOption = "RECOMMENDED_VALUE" | "NULL";
/**
 * Type definition for `AWS::QuickSight::Analysis.VerticalTextAlignment`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-verticaltextalignment.html}
 */
export type VerticalTextAlignment = "TOP" | "MIDDLE" | "BOTTOM" | "AUTO";
/**
 * Type definition for `AWS::QuickSight::Analysis.Visibility`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visibility.html}
 */
export type Visibility = "HIDDEN" | "VISIBLE";
/**
 * Type definition for `AWS::QuickSight::Analysis.VisibleRangeOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visiblerangeoptions.html}
 */
export type VisibleRangeOptions = {
  PercentRange?: PercentVisibleRange;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.Visual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visual.html}
 */
export type Visual = {
  BarChartVisual?: BarChartVisual;
  BoxPlotVisual?: BoxPlotVisual;
  ComboChartVisual?: ComboChartVisual;
  CustomContentVisual?: CustomContentVisual;
  EmptyVisual?: EmptyVisual;
  FilledMapVisual?: FilledMapVisual;
  FunnelChartVisual?: FunnelChartVisual;
  GaugeChartVisual?: GaugeChartVisual;
  GeospatialMapVisual?: GeospatialMapVisual;
  HeatMapVisual?: HeatMapVisual;
  HistogramVisual?: HistogramVisual;
  InsightVisual?: InsightVisual;
  KPIVisual?: KPIVisual;
  LineChartVisual?: LineChartVisual;
  PieChartVisual?: PieChartVisual;
  PivotTableVisual?: PivotTableVisual;
  RadarChartVisual?: RadarChartVisual;
  SankeyDiagramVisual?: SankeyDiagramVisual;
  ScatterPlotVisual?: ScatterPlotVisual;
  TableVisual?: TableVisual;
  TreeMapVisual?: TreeMapVisual;
  WaterfallVisual?: WaterfallVisual;
  WordCloudVisual?: WordCloudVisual;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.VisualCustomAction`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visualcustomaction.html}
 */
export type VisualCustomAction = {
  /**
   * @minLength `1`
   * @maxLength `2`
   */
  ActionOperations: VisualCustomActionOperation[];
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  CustomActionId: string;
  /**
   * @minLength `1`
   * @maxLength `256`
   */
  Name: string;
  Status?: WidgetStatus;
  Trigger: VisualCustomActionTrigger;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.VisualCustomActionOperation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visualcustomactionoperation.html}
 */
export type VisualCustomActionOperation = {
  FilterOperation?: CustomActionFilterOperation;
  NavigationOperation?: CustomActionNavigationOperation;
  SetParametersOperation?: CustomActionSetParametersOperation;
  URLOperation?: CustomActionURLOperation;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.VisualCustomActionTrigger`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visualcustomactiontrigger.html}
 */
export type VisualCustomActionTrigger = "DATA_POINT_CLICK" | "DATA_POINT_MENU";
/**
 * Type definition for `AWS::QuickSight::Analysis.VisualPalette`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visualpalette.html}
 */
export type VisualPalette = {
  /**
   * @pattern `^#[A-F0-9]{6}$`
   */
  ChartColor?: string;
  /**
   * @maxLength `5000`
   */
  ColorMap?: DataPathColor[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.VisualSubtitleLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visualsubtitlelabeloptions.html}
 */
export type VisualSubtitleLabelOptions = {
  FormatText?: LongFormatText;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.VisualTitleLabelOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-visualtitlelabeloptions.html}
 */
export type VisualTitleLabelOptions = {
  FormatText?: ShortFormatText;
  Visibility?: Visibility;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WaterfallChartAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-waterfallchartaggregatedfieldwells.html}
 */
export type WaterfallChartAggregatedFieldWells = {
  /**
   * @maxLength `200`
   */
  Breakdowns?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Categories?: DimensionField[];
  /**
   * @maxLength `200`
   */
  Values?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WaterfallChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-waterfallchartconfiguration.html}
 */
export type WaterfallChartConfiguration = {
  CategoryAxisDisplayOptions?: AxisDisplayOptions;
  CategoryAxisLabelOptions?: ChartAxisLabelOptions;
  DataLabels?: DataLabelOptions;
  FieldWells?: WaterfallChartFieldWells;
  Legend?: LegendOptions;
  PrimaryYAxisDisplayOptions?: AxisDisplayOptions;
  PrimaryYAxisLabelOptions?: ChartAxisLabelOptions;
  SortConfiguration?: WaterfallChartSortConfiguration;
  VisualPalette?: VisualPalette;
  WaterfallChartOptions?: WaterfallChartOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WaterfallChartFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-waterfallchartfieldwells.html}
 */
export type WaterfallChartFieldWells = {
  WaterfallChartAggregatedFieldWells?: WaterfallChartAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WaterfallChartOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-waterfallchartoptions.html}
 */
export type WaterfallChartOptions = {
  TotalBarLabel?: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WaterfallChartSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-waterfallchartsortconfiguration.html}
 */
export type WaterfallChartSortConfiguration = {
  BreakdownItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WaterfallVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-waterfallvisual.html}
 */
export type WaterfallVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: WaterfallChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WhatIfPointScenario`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-whatifpointscenario.html}
 */
export type WhatIfPointScenario = {
  Date: string;
  Value: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WhatIfRangeScenario`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-whatifrangescenario.html}
 */
export type WhatIfRangeScenario = {
  EndDate: string;
  StartDate: string;
  Value: number;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WidgetStatus`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-widgetstatus.html}
 */
export type WidgetStatus = "ENABLED" | "DISABLED";
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudAggregatedFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudaggregatedfieldwells.html}
 */
export type WordCloudAggregatedFieldWells = {
  /**
   * @maxLength `10`
   */
  GroupBy?: DimensionField[];
  /**
   * @maxLength `1`
   */
  Size?: MeasureField[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudChartConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudchartconfiguration.html}
 */
export type WordCloudChartConfiguration = {
  CategoryLabelOptions?: ChartAxisLabelOptions;
  FieldWells?: WordCloudFieldWells;
  SortConfiguration?: WordCloudSortConfiguration;
  WordCloudOptions?: WordCloudOptions;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudCloudLayout`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudcloudlayout.html}
 */
export type WordCloudCloudLayout = "FLUID" | "NORMAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudFieldWells`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudfieldwells.html}
 */
export type WordCloudFieldWells = {
  WordCloudAggregatedFieldWells?: WordCloudAggregatedFieldWells;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudOptions`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudoptions.html}
 */
export type WordCloudOptions = {
  CloudLayout?: WordCloudCloudLayout;
  /**
   * @min `1`
   * @max `100`
   */
  MaximumStringLength?: number;
  WordCasing?: WordCloudWordCasing;
  WordOrientation?: WordCloudWordOrientation;
  WordPadding?: WordCloudWordPadding;
  WordScaling?: WordCloudWordScaling;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudSortConfiguration`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudsortconfiguration.html}
 */
export type WordCloudSortConfiguration = {
  CategoryItemsLimit?: ItemsLimitConfiguration;
  /**
   * @maxLength `100`
   */
  CategorySort?: FieldSortOptions[];
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudVisual`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudvisual.html}
 */
export type WordCloudVisual = {
  /**
   * @maxLength `10`
   */
  Actions?: VisualCustomAction[];
  ChartConfiguration?: WordCloudChartConfiguration;
  /**
   * @maxLength `2`
   */
  ColumnHierarchies?: ColumnHierarchy[];
  Subtitle?: VisualSubtitleLabelOptions;
  Title?: VisualTitleLabelOptions;
  /**
   * @minLength `1`
   * @maxLength `512`
   * @pattern `[\w\-]+`
   */
  VisualId: string;
};
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudWordCasing`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudwordcasing.html}
 */
export type WordCloudWordCasing = "LOWER_CASE" | "EXISTING_CASE";
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudWordOrientation`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudwordorientation.html}
 */
export type WordCloudWordOrientation = "HORIZONTAL" | "HORIZONTAL_AND_VERTICAL";
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudWordPadding`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudwordpadding.html}
 */
export type WordCloudWordPadding = "NONE" | "SMALL" | "MEDIUM" | "LARGE";
/**
 * Type definition for `AWS::QuickSight::Analysis.WordCloudWordScaling`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-quicksight-analysis-wordcloudwordscaling.html}
 */
export type WordCloudWordScaling = "EMPHASIZE" | "NORMAL";
/**
 * Definition of the AWS::QuickSight::Analysis Resource Type.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-analysis.html}
 */
export class QuickSightAnalysis extends $Resource<
  "AWS::QuickSight::Analysis",
  QuickSightAnalysisProperties,
  QuickSightAnalysisAttributes
> {
  public static readonly Type = "AWS::QuickSight::Analysis";
  public static readonly AttributeNames = [
    "Arn" as const,
    "CreatedTime" as const,
    "DataSetArns" as const,
    "Errors" as const,
    "LastUpdatedTime" as const,
    "Sheets" as const,
  ];
  constructor(
    logicalId: string,
    properties: QuickSightAnalysisProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      QuickSightAnalysis.Type,
      properties,
      QuickSightAnalysis.AttributeNames,
      options,
    );
  }
}
