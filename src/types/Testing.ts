type ConfusionMatrix = [[number, number], [number, number]];

type TestingData = {
  tweet: string[];
  actual_label: string[];
  predicted_label: string[];
};

type TrainingData = {
  tweet: string[];
  label: string[];
};

type ResponseTesting = {
  accuracy: number;
  confusion_matrix: ConfusionMatrix;
  precision: number;
  recall: number;
  f1_score: number;
  training_data: TrainingData;
  testing_data: TestingData;
};
