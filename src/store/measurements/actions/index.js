import * as deleteMeasurement from './deleteMeasurement';
import * as createMeasurement from './createMeasurement';
import * as editMeasurement from './editMeasurement';

export default {
  ...deleteMeasurement,
  ...createMeasurement,
  ...editMeasurement,
};
