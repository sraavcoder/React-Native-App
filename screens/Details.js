import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      type : this.props.navigation.getParam("type"),
      url: `http://localhost:5000/${this.props.navigation.getParam("type")}?name=${this.props.navigation.getParam(
        "planet_name"
      )}`
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        this.setDetails(response.data.data);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  setDetails = planetDetails => {
    const planetType = this.state.type;
    let image_Path = "";
    switch (planetType) {
      case "Dwarf":
        image_Path = require("../assets/planet_type/BrownDw.jpg");
        break;
      case "Star":
        image_Path = require("../assets/planet_type/Star_.jpg");
        break;
    }
    this.setState({
      details: planetDetails,
      imagePath: image_Path
    });
  };

  render() {
    console.log(this.state.imagePath)
      return (
        <View style={styles.container}>
          <Card
            title={this.state.type == "Dwarf" ? this.state.details.Brown_Dwarf_Name : this.state.details.Star_name}
            image={this.state.imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
          </Card>
          <View>
              <Text
                style={styles.cardItem}
              >{`Distance : ${this.state.type == "Dwarf" ? this.state.details.Distance_BrownDwarf : this.state.details.Distance_Star}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Mass : ${this.state.type == "Dwarf" ? this.state.details.Mass_BrownDwarf : this.state.details.Mass_Star}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Radius : ${this.state.type == "Dwarf" ? this.state.details.Radius_BrownDwarf : this.state.details.Radius_Star}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${this.state.type == "Dwarf" ? this.state.details.Gravity_Dwarf : this.state.details.Gravity_Star}`}</Text>
            </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 5,
  },
  cardItem: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#838485",
    marginTop: 10,
    alignSelf: 'center'
  }
});
