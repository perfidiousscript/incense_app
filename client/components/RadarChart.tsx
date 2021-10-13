import { FC } from "react";
import * as d3 from "d3";
import { useEffect } from "react";

const RadarChart: FC<{}> = (props) => {
  const { review } = props;
  const size = {
    xLarge: { height: 600, width: 600, range: 250 },
    large: { height: 250, width: 250 },
    medium: { height: 100, width: 100 },
    small: { height: 50, width: 50 },
  };

  const incenseProperties = {
    sweet: review.sweet,
    ethereal: review.ethereal,
    savory: review.savory,
    smokey: review.smokey,
    woody: review.woody,
    earthy: review.earthy,
    herbal: review.herbal,
    floral: review.floral,
    citrus: review.citrus,
    fruity: review.fruity,
  };

  const propertyKeys = Object.keys(incenseProperties);

  function renderChart() {
    // d3.select(".radarChart").remove("svg");
    const svg = d3
      .select(".radarChart")
      .append("svg")
      .attr("width", size["xLarge"]["width"])
      .attr("height", size["xLarge"]["height"]);

    const radialScale = d3
      .scaleLinear()
      .domain([0, 5])
      .range([0, size["xLarge"]["range"]]);

    const ticks = [1, 2, 3, 4, 5];

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);
    let colors = ["darkorange", "gray", "navy"];

    ticks.forEach((t) =>
      svg
        .append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
    );

    ticks.forEach((t) =>
      svg
        .append("text")
        .attr("x", 305)
        .attr("y", 300 - radialScale(t))
        .text(t.toString())
    );

    function angleToCoordinate(angle, value, xOffsetVal) {
      let xOffset = xOffsetVal || 0;
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: 300 + x + xOffset, y: 300 - y };
    }

    propertyKeys.map((propertyKey, index) => {
      let angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
      let line_coordinate = angleToCoordinate(angle, 5);
      let label_coordinate = angleToCoordinate(angle, 5.6, -25);

      //draw axis line
      svg
        .append("line")
        .attr("x1", 300)
        .attr("y1", 300)
        .attr("x2", line_coordinate.x)
        .attr("y2", line_coordinate.y)
        .attr("stroke", "black");

      //draw axis label
      svg
        .append("text")
        .attr("x", label_coordinate.x)
        .attr("y", label_coordinate.y)
        .text(propertyKey);
    });

    let color = colors[0];
    let coordinates = propertyKeys.map((propertyKey, index) => {
      let angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
      return angleToCoordinate(angle, incenseProperties[propertyKey]);
    });

    //draw the path element
    svg
      .append("path")
      .datum(coordinates)
      .attr("d", line)
      .attr("stroke-width", 3)
      .attr("stroke", color)
      .attr("fill", color)
      .attr("stroke-opacity", 1)
      .attr("opacity", 0.5);
  }

  useEffect(() => {
    renderChart();
  }, []);

  return <div className="radarChart"></div>;
};

export default RadarChart;
