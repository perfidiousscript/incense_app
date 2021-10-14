import { FC } from "react";
import * as d3 from "d3";
import { useEffect } from "react";

const RadarChart: FC<{}> = (props) => {
  const { review } = props;
  const { size } = props;
  const propertiesList = [
    "sweet",
    "floral",
    "ethereal",
    "smokey",
    "woody",
    "earthy",
    "savory",
    "herbal",
    "spicy",
    "citrus",
    "fruity",
  ];
  const scale = {
    xLarge: 12,
    large: 8,
    medium: 4,
    small: 1,
  };

  let incenseProperties = {};

  propertiesList.map((property) => {
    incenseProperties[property] = review[property];
  });

  const propertyKeys = Object.keys(incenseProperties);

  function setProperty(propertyType: string, value: number) {
    switch (propertyType) {
      case "savory":
        props.setSavory(value);
        break;
      case "sweet":
        props.setSweet(value);
        break;
      case "smokey":
        props.setSmokey(value);
        break;
      case "woody":
        props.setWoody(value);
        break;
      case "ethereal":
        props.setEthereal(value);
        break;
      case "fruity":
        props.setFruity(value);
        break;
      case "herbal":
        props.setHerbal(value);
        break;
      case "spicy":
        props.setSpicy(value);
        break;
      case "citrus":
        props.setCitrus(value);
        break;
      case "floral":
        props.setFloral(value);
        break;
      case "earthy":
        props.setEarthy(value);
        break;
    }
  }

  function renderChart() {
    d3.select(`.radarChart-${props.reviewId}`).select("svg").remove();
    const svg = d3
      .select(`.radarChart-${props.reviewId}`)
      .append("svg")
      .attr("width", 60 * scale[size])
      .attr("height", 60 * scale[size]);

    const radialScale = d3
      .scaleLinear()
      .domain([-1, 5])
      .range([0, 25 * scale[size]]);

    const ticks = [0, 1, 2, 3, 4, 5];

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);

    let colors = ["blue", "lightBlue", "navy"];

    if (size !== "small") {
      ticks.forEach((t) =>
        svg
          .append("circle")
          .attr("cx", 30 * scale[size])
          .attr("cy", 30 * scale[size])
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("r", radialScale(t))
      );
      if (size !== "medium") {
        ticks.forEach((t) =>
          svg
            .append("text")
            .attr("x", 30 * scale[size])
            .attr("y", 30 * scale[size] - radialScale(t))
            .text(t.toString())
        );
      }
    }

    function angleToCoordinate(angle, value, xOffsetVal) {
      let xOffset = xOffsetVal || 0;
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: 30 * scale[size] + x + xOffset, y: 30 * scale[size] - y };
    }

    function coordinatesToDistance(xVal, yVal) {
      let zeroCoord = 30 * scale[size];
      let xPixelDist = xVal - zeroCoord;
      let yPixelDist = yVal - zeroCoord;
      let totalPixelDist = Math.sqrt(
        xPixelDist * xPixelDist + yPixelDist * yPixelDist
      );
      let rating = radialScale.invert(totalPixelDist);
      return Math.round(rating);
    }

    propertyKeys.map((propertyKey, index) => {
      let angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
      let line_coordinate = angleToCoordinate(angle, 5);
      let label_coordinate = angleToCoordinate(angle, 5.6, -2 * scale[size]);

      //draw axis line
      svg
        .append("line")
        .attr("class", "line")
        .attr("x1", 30 * scale[size])
        .attr("y1", 30 * scale[size])
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke", "black");

      //draw axis label
      if (size !== "small") {
        svg
          .append("text")
          .attr("x", label_coordinate.x)
          .attr("y", label_coordinate.y)
          .text(propertyKey);
      }
    });

    let coordinates = propertyKeys.map((propertyKey, index) => {
      let angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
      return angleToCoordinate(angle, incenseProperties[propertyKey]);
    });

    //Closes the loop
    let finalCoordinates = angleToCoordinate(
      Math.PI / 2 + (2 * Math.PI * 0) / propertyKeys.length,
      incenseProperties["sweet"]
    );

    coordinates.push(finalCoordinates);

    //draw the path element
    svg
      .append("path")
      .datum(coordinates)
      .attr("d", line)
      .attr("stroke-width", 0.25 * scale[size])
      .attr("stroke", colors[0])
      .attr("fill", colors[1])
      .attr("stroke-opacity", 1)
      .attr("opacity", 0.5);

    // Handles interactivity
    if (props.interactive === true) {
      // Draws invisible, thicker lines on top of the axes so that selecting the value is easier.
      // This is placed way down here so it gets drawn over the shape (for clickability).
      propertyKeys.map((propertyKey, index) => {
        let angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
        let line_coordinate = angleToCoordinate(angle, 5);
        svg
          .append("line")
          .attr("class", "selectionHelper")
          .attr("stroke-width", 10)
          .attr("data-property-type", propertyKey)
          .attr("x1", 30 * scale[size])
          .attr("y1", 30 * scale[size])
          .attr("x2", line_coordinate.x)
          .attr("y2", line_coordinate.y)
          .attr("stroke", "black")
          .attr("opacity", 0)
          .attr("z-index", 5);
      });

      d3.selectAll(".selectionHelper").call(
        d3.drag().on("start", function (event) {
          const line = d3.select(this).classed("dragging", true);
          let property = event.sourceEvent.srcElement.dataset.propertyType;
          let rating = coordinatesToDistance(event.subject.x, event.subject.y);
          setProperty(property, rating);
        })
      );
    }
  }

  useEffect(() => {
    renderChart();
  }, [propertiesList]);

  return <div className={`radarChart-${props.reviewId}`}></div>;
};

export default RadarChart;
