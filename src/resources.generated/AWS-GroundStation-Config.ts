import { Resource as $Resource } from "../template/Resource.js";
import { ResourceOptions as $ResourceOptions } from "../template.js";
/**
 * Resource type definition for `AWS::GroundStation::Config`.
 * AWS Ground Station config resource type for CloudFormation.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-groundstation-config.html}
 */
export type GroundStationConfigProperties = {
  ConfigData: ConfigData;
  /**
   * @pattern `^[ a-zA-Z0-9_:-]{1,256}$`
   */
  Name: string;
  Tags?: Tag[];
};
/**
 * Attribute type definition for `AWS::GroundStation::Config`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-groundstation-config.html#aws-resource-groundstation-config-return-values}
 */
export type GroundStationConfigAttributes = {
  Arn: string;
  Id: string;
  Type: string;
};
/**
 * Type definition for `AWS::GroundStation::Config.AntennaDownlinkConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-antennadownlinkconfig.html}
 */
export type AntennaDownlinkConfig = {
  SpectrumConfig?: SpectrumConfig;
};
/**
 * Type definition for `AWS::GroundStation::Config.AntennaDownlinkDemodDecodeConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-antennadownlinkdemoddecodeconfig.html}
 */
export type AntennaDownlinkDemodDecodeConfig = {
  DecodeConfig?: DecodeConfig;
  DemodulationConfig?: DemodulationConfig;
  SpectrumConfig?: SpectrumConfig;
};
/**
 * Type definition for `AWS::GroundStation::Config.AntennaUplinkConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-antennauplinkconfig.html}
 */
export type AntennaUplinkConfig = {
  SpectrumConfig?: UplinkSpectrumConfig;
  TargetEirp?: Eirp;
  TransmitDisabled?: boolean;
};
/**
 * Type definition for `AWS::GroundStation::Config.BandwidthUnits`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-bandwidthunits.html}
 */
export type BandwidthUnits = "GHz" | "MHz" | "kHz";
/**
 * Type definition for `AWS::GroundStation::Config.ConfigData`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-configdata.html}
 */
export type ConfigData = {
  AntennaDownlinkConfig?: AntennaDownlinkConfig;
  AntennaDownlinkDemodDecodeConfig?: AntennaDownlinkDemodDecodeConfig;
  AntennaUplinkConfig?: AntennaUplinkConfig;
  DataflowEndpointConfig?: DataflowEndpointConfig;
  S3RecordingConfig?: S3RecordingConfig;
  TrackingConfig?: TrackingConfig;
  UplinkEchoConfig?: UplinkEchoConfig;
};
/**
 * Type definition for `AWS::GroundStation::Config.DataflowEndpointConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-dataflowendpointconfig.html}
 */
export type DataflowEndpointConfig = {
  DataflowEndpointName?: string;
  DataflowEndpointRegion?: string;
};
/**
 * Type definition for `AWS::GroundStation::Config.DecodeConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-decodeconfig.html}
 */
export type DecodeConfig = {
  /**
   * @pattern `^[{}\[\]:.,"0-9A-z\-_\s]{1,8192}$`
   */
  UnvalidatedJSON?: string;
};
/**
 * Type definition for `AWS::GroundStation::Config.DemodulationConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-demodulationconfig.html}
 */
export type DemodulationConfig = {
  /**
   * @pattern `^[{}\[\]:.,"0-9A-z\-_\s]{1,8192}$`
   */
  UnvalidatedJSON?: string;
};
/**
 * Type definition for `AWS::GroundStation::Config.Eirp`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-eirp.html}
 */
export type Eirp = {
  Units?: EirpUnits;
  Value?: number;
};
/**
 * Type definition for `AWS::GroundStation::Config.EirpUnits`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-eirpunits.html}
 */
export type EirpUnits = "dBW";
/**
 * Type definition for `AWS::GroundStation::Config.Frequency`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-frequency.html}
 */
export type Frequency = {
  Units?: FrequencyUnits;
  Value?: number;
};
/**
 * Type definition for `AWS::GroundStation::Config.FrequencyBandwidth`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-frequencybandwidth.html}
 */
export type FrequencyBandwidth = {
  Units?: BandwidthUnits;
  Value?: number;
};
/**
 * Type definition for `AWS::GroundStation::Config.FrequencyUnits`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-frequencyunits.html}
 */
export type FrequencyUnits = "GHz" | "MHz" | "kHz";
/**
 * Type definition for `AWS::GroundStation::Config.Polarization`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-polarization.html}
 */
export type Polarization = "LEFT_HAND" | "RIGHT_HAND" | "NONE";
/**
 * Type definition for `AWS::GroundStation::Config.S3RecordingConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-s3recordingconfig.html}
 */
export type S3RecordingConfig = {
  BucketArn?: string;
  /**
   * @pattern `^([a-zA-Z0-9_\-=/]|\{satellite_id\}|\{config\-name}|\{s3\-config-id}|\{year\}|\{month\}|\{day\}){1,900}$`
   */
  Prefix?: string;
  RoleArn?: string;
};
/**
 * Type definition for `AWS::GroundStation::Config.SpectrumConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-spectrumconfig.html}
 */
export type SpectrumConfig = {
  Bandwidth?: FrequencyBandwidth;
  CenterFrequency?: Frequency;
  Polarization?: Polarization;
};
/**
 * Type definition for `AWS::GroundStation::Config.Tag`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-tag.html}
 */
export type Tag = {
  /**
   * @pattern `^[ a-zA-Z0-9\+\-=._:/@]{1,128}$`
   */
  Key?: string;
  /**
   * @pattern `^[ a-zA-Z0-9\+\-=._:/@]{1,256}$`
   */
  Value?: string;
};
/**
 * Type definition for `AWS::GroundStation::Config.TrackingConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-trackingconfig.html}
 */
export type TrackingConfig = {
  Autotrack?: "REQUIRED" | "PREFERRED" | "REMOVED";
};
/**
 * Type definition for `AWS::GroundStation::Config.UplinkEchoConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-uplinkechoconfig.html}
 */
export type UplinkEchoConfig = {
  AntennaUplinkConfigArn?: string;
  Enabled?: boolean;
};
/**
 * Type definition for `AWS::GroundStation::Config.UplinkSpectrumConfig`.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-groundstation-config-uplinkspectrumconfig.html}
 */
export type UplinkSpectrumConfig = {
  CenterFrequency?: Frequency;
  Polarization?: Polarization;
};
/**
 * Resource type definition for `AWS::GroundStation::Config`.
 * AWS Ground Station config resource type for CloudFormation.
 * @see {@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-groundstation-config.html}
 */
export class GroundStationConfig extends $Resource<
  "AWS::GroundStation::Config",
  GroundStationConfigProperties,
  GroundStationConfigAttributes
> {
  public static readonly Type = "AWS::GroundStation::Config";
  public static readonly AttributeNames = [
    "Arn" as const,
    "Id" as const,
    "Type" as const,
  ];
  constructor(
    logicalId: string,
    properties: GroundStationConfigProperties,
    options?: $ResourceOptions,
  ) {
    super(
      logicalId,
      GroundStationConfig.Type,
      properties,
      GroundStationConfig.AttributeNames,
      options,
    );
  }
}
