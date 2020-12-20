// This class creates brain of a Bot
// Tensorfliw js is used here
class NeuralNetwork {
    // constructor
    constructor(a, b, c, d) {
        // If a is already a sequential model
        if (a instanceof tf.Sequential) {
            this.model = a;
            // input nodes in neural network
            this.input_nodes = b;
            // intermediate nodes in neural network
            this.hidden_nodes = c;
            // output nodes in neural network
            this.output_nodes = d;
        } 
        else {
            // input nodes in neural network
            this.input_nodes = a;
            // intermediate nodes in neural network
            this.hidden_nodes = b;
            // output nodes in neural network
            this.output_nodes = c;
            this.model = this.createModel();
        }
    }

    // Function to create copy of brain
    copy() {
        // tidy stops memory leaks
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];

            // copy the weights of model
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }

            // set weights in the copied model
            modelCopy.setWeights(weightCopies);

            // create a new neural network similar to the previous
            // one and return it.
            return new NeuralNetwork(
                modelCopy,
                this.input_nodes,
                this.hidden_nodes,
                this.output_nodes
            );
        });
    }

    mutate(rate) {
        // tidy avoids memory leaks
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    // dispose the model
    dispose() {
        this.model.dispose();
    }

    // This function predicts output for the Bot
    predict(inputs) {
        return tf.tidy(() => {
            // tensor2d is for 2D
            // create Tensor
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);

            // dataSync is used to block UI thread, until it gets values
            const outputs = ys.dataSync();
            return outputs;
        });
    }

    // Function to create sequential model
    // A sequential model is a model in which outputs of one layer
    // are inputs of next layer.
    createModel() {
        // create sequential model
        const model = tf.sequential();

        // First layer should have input shape defined
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        });
        model.add(hidden);

        // model's output
        const output = tf.layers.dense({
            units: this.output_nodes,
        });
        model.add(output);
        // console.log(model);
        return model;
    }
}