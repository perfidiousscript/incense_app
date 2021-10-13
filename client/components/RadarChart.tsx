import { FC } from "react";
import * as d3 from "d3";
import { useEffect } from "react";

const RadarChart: FC<{}> = (props) => {
  const { review } = props;
  const { size } = props;
  const scale = {
    xLarge: 12,
    large: 8,
    medium: 4,
    small: 1,
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
      .select(`.radarChart-${review.id}`)
      .append("svg")
      .attr("width", 60 * scale[size])
      .attr("height", 50 * scale[size]);

    const radialScale = d3
      .scaleLinear()
      .domain([-1, 5])
      .range([0, 25 * scale[size]]);

    const ticks = [0, 1, 2, 3, 4, 5];

    let line = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y);
    let colors = ["blue", "gray", "navy"];

    if (size !== "small") {
      ticks.forEach((t) =>
        svg
          .append("circle")
          .attr("cx", 30 * scale[size])
          .attr("cy", 25 * scale[size])
          .attr("fill", "none")
          .attr("stroke", "gray")
          .attr("r", radialScale(t))
      );

      ticks.forEach((t) =>
        svg
          .append("text")
          .attr("x", 30 * scale[size])
          .attr("y", 25 * scale[size] - radialScale(t))
          .text(t.toString())
      );
    }

    function angleToCoordinate(angle, value, xOffsetVal) {
      let xOffset = xOffsetVal || 0;
      let x = Math.cos(angle) * radialScale(value);
      let y = Math.sin(angle) * radialScale(value);
      return { x: 30 * scale[size] + x + xOffset, y: 25 * scale[size] - y };
    }

    propertyKeys.map((propertyKey, index) => {
      let angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
      let line_coordinate = angleToCoordinate(angle, 5);
      let label_coordinate = angleToCoordinate(angle, 5.6, -2 * scale[size]);

      //draw axis line
      svg
        .append("line")
        .attr("x1", 30 * scale[size])
        .attr("y1", 25 * scale[size])
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

  return <div className={`radarChart-${review.id}`}></div>;
};

export default RadarChart;
