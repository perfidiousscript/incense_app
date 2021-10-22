import { FC } from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import { ReviewChart } from "types";
import { propertiesList } from "lib/constants";

const RadarChart = ({
  isStatistic,
  reviewId,
  interactive,
  review,
  size,
  setSavory,
  setSweet,
  setSmokey,
  setWoody,
  setEthereal,
  setFruity,
  setHerbal,
  setSpicy,
  setCitrus,
  setFloral,
  setEarthy,
}: ReviewChart) => {
  const scale: { [name: string]: number } = {
    xLarge: 12,
    large: 8,
    medium: 4,
    small: 1,
  };

  const incenseProperties: { [name: string]: number } = {};

  if (isStatistic) {
    propertiesList.map((property: string) => {
      let averageProperty: string = `${property}Avg`;
      incenseProperties[property] = review[averageProperty];
    });
  } else {
    propertiesList.map((property: string) => {
      incenseProperties[property] = review[property];
    });
  }

  const propertyKeys = Object.keys(incenseProperties);

  function setProperty(propertyType: string, value: number) {
    switch (propertyType) {
      case "savory":
        setSavory?.(value);
        break;
      case "sweet":
        setSweet?.(value);
        break;
      case "smokey":
        setSmokey?.(value);
        break;
      case "woody":
        setWoody?.(value);
        break;
      case "ethereal":
        setEthereal?.(value);
        break;
      case "fruity":
        setFruity?.(value);
        break;
      case "herbal":
        setHerbal?.(value);
        break;
      case "spicy":
        setSpicy?.(value);
        break;
      case "citrus":
        setCitrus?.(value);
        break;
      case "floral":
        setFloral?.(value);
        break;
      case "earthy":
        setEarthy?.(value);
        break;
    }
  }

  function renderChart() {
    d3.select(`.radarChart-${reviewId}`).select("svg").remove();
    const svg = d3
      .select(`.radarChart-${reviewId}`)
      .append("svg")
      .attr("width", 60 * scale[size])
      .attr("height", 60 * scale[size]);

    const radialScale = d3
      .scaleLinear()
      .domain([-1, 5])
      .range([0, 25 * scale[size]]);

    const ticks = [0, 1, 2, 3, 4, 5];

    const line = d3
      .line<{ x: any; y: any }>()
      .x((d) => d.x)
      .y((d) => d.y);

    const colors = ["black", "navy"];

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

    function angleToCoordinate(
      angle: number,
      value: number,
      xOffsetVal?: number
    ) {
      const xOffset = xOffsetVal || 0;
      const x = Math.cos(angle) * radialScale(value);
      const y = Math.sin(angle) * radialScale(value);
      return { x: 30 * scale[size] + x + xOffset, y: 30 * scale[size] - y };
    }

    function coordinatesToDistance(xVal: number, yVal: number) {
      const zeroCoord = 30 * scale[size];
      const xPixelDist = xVal - zeroCoord;
      const yPixelDist = yVal - zeroCoord;
      const totalPixelDist = Math.sqrt(
        xPixelDist * xPixelDist + yPixelDist * yPixelDist
      );
      const rating = radialScale.invert(totalPixelDist);
      return Math.round(rating);
    }

    function dragRadar(event: MouseEvent) {
      console.log("event: ", event);
      d3.select(this).classed("dragging", true);
      const property = event.sourceEvent.srcElement.dataset.propertyType;
      const rating = coordinatesToDistance(event.subject.x, event.subject.y);
      setProperty(property, rating);
    }

    propertyKeys.map((propertyKey, index) => {
      const angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
      const line_coordinate = angleToCoordinate(angle, 5);
      const label_coordinate = angleToCoordinate(angle, 5.6, -2 * scale[size]);

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

    const coordinates = propertyKeys.map((propertyKey, index) => {
      const angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
      return angleToCoordinate(angle, incenseProperties[propertyKey]);
    });

    //Closes the loop
    const finalCoordinates = angleToCoordinate(
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
    if (interactive === true) {
      // Draws invisible, thicker lines on top of the axes so that selecting the value is easier.
      // This is placed way down here so it gets drawn over the shape (for clickability).
      propertyKeys.map((propertyKey, index) => {
        const angle = Math.PI / 2 + (2 * Math.PI * index) / propertyKeys.length;
        const line_coordinate = angleToCoordinate(angle, 5);
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

      svg.selectAll(".selectionHelper").call(d3.drag().on("start", dragRadar));
    }
  }

  useEffect(() => {
    renderChart();
  }, [incenseProperties]);

  return <div className={`radarChart-${reviewId}`}></div>;
};

export default RadarChart;
