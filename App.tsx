import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';

// Functional component for BMI Calculator
const BMICalculator = () => {
  // State variables to store weight and height
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // State variable to store the calculated BMI
  const [bmi, setBMI] = useState(null);

  // Function to calculate BMI
  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    // Check if weight and height are valid numbers
    if (
      isNaN(weightValue) ||
      isNaN(heightValue) ||
      heightValue === 0 ||
      weightValue === 0
    ) {
      alert('Please enter valid weight and height.');
      return;
    }

    // Calculate BMI using the formula: BMI = weight (kg) / (height (m))^2
    const bmiValue = weightValue / Math.pow(heightValue / 100, 2);

    // Update the state with the calculated BMI
    setBMI(bmiValue.toFixed(2));
  };

  // Function to get BMI category and color
  const getBMICategory = () => {
    if (bmi === null) {
      return {category: '', color: '#333'};
    } else if (bmi < 18.5) {
      return {category: 'Underweight', color: '#e74c3c'};
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return {category: 'Healthy', color: '#2ecc71'};
    } else if (bmi >= 25 && bmi < 29.9) {
      return {category: 'Overweight', color: '#f39c12'};
    } else {
      return {category: 'Obese', color: '#e74c3c'};
    }
  };

  const {category, color} = getBMICategory();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BMI Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={text => setWeight(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={text => setHeight(text)}
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Your BMI:</Text>
          <Text style={[styles.bmiValue, {color: color}]}>{bmi}</Text>
          <Text style={[styles.category, {color: color}]}>{category}</Text>

          {category === 'Healthy' && (
            <Image
              source={require('./assets/Healthy.png')}
              style={styles.image}
            />
          )}
          {category === 'Underweight' && (
            <Image
              source={require('./assets/Underweight.png')}
              style={styles.image}
            />
          )}
          {(category === 'Obese' || category === 'Overweight') && (
            <Image
              source={require('./assets/Obese.png')}
              style={styles.image}
            />
          )}
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'transparent',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  category: {
    fontSize: 18,
    marginTop: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    objectFit: 'contain',
  },
});

// Exporting the component
export default BMICalculator;
