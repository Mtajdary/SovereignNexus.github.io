class ModelLoader {
  constructor() {
    this.isLoaded = false;
    this.modelName = 'ResNet-18 Concrete Classifier';
  }

  async loadModel() {
    // شبیه‌ساز آماده‌سازی پایپ‌لاین استنتاج ONNX / WebGPU
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isLoaded = true;
        resolve({ status: 'READY', model: this.modelName });
      }, 500);
    });
  }
}

export const aiModelLoader = new ModelLoader();
