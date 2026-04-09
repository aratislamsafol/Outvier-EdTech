'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import type { University } from '@/hooks/useUniversities';

interface ROIChartProps {
  universities: University[];
  width?: number;
  height?: number;
}

export function ROIChart({ universities, width = 600, height = 350 }: ROIChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const chartData = useMemo(() => {
    return universities.map(uni => {
      const expectedSalary = uni.employmentRate * 50;
      const totalCost = uni.tuition * 2;
      const yearsToBreakEven = totalCost / (expectedSalary - totalCost * 0.1);
      return {
        name: uni.name.length > 15 ? uni.name.substring(0, 15) + '...' : uni.name,
        fullName: uni.name,
        tuition: uni.tuition,
        expectedSalary,
        totalCost,
        yearsToBreakEven: Math.max(1, Math.min(20, Math.round(yearsToBreakEven))),
        employmentRate: uni.employmentRate,
      };
    });
  }, [universities]);

  useEffect(() => {
    if (!svgRef.current || chartData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 30, bottom: 80, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand()
      .domain(chartData.map(d => d.name))
      .range([0, innerWidth])
      .padding(0.3);

    const x1 = d3.scaleBand()
      .domain(['tuition', 'salary'])
      .range([0, x0.bandwidth()])
      .padding(0.1);

    const maxValue = d3.max(chartData, d => Math.max(d.tuition, d.expectedSalary)) || 100000;
    const y = d3.scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(['tuition', 'salary'])
      .range(['#f43f5e', '#10b981']);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0))
      .selectAll('text')
      .attr('transform', 'rotate(-25)')
      .style('text-anchor', 'end')
      .style('font-size', '11px')
      .style('fill', '#64748b');

    g.append('g')
      .call(d3.axisLeft(y).ticks(6).tickFormat(d => `$${d3.format('.2s')(d as number)}`))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#64748b');

    g.selectAll('.domain, .tick line').style('stroke', '#e2e8f0');

    const barGroups = g.selectAll('.bar-group')
      .data(chartData)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', d => `translate(${x0(d.name)},0)`);

    barGroups.append('rect')
      .attr('x', x1('tuition')!)
      .attr('y', d => y(d.tuition))
      .attr('width', x1.bandwidth())
      .attr('height', d => innerHeight - y(d.tuition))
      .attr('fill', '#f43f5e')
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseover', function() { d3.select(this).attr('opacity', 0.8); })
      .on('mouseout', function() { d3.select(this).attr('opacity', 1); })
      .append('title')
      .text(d => `Tuition: $${d.tuition.toLocaleString()}/yr`);

    barGroups.append('rect')
      .attr('x', x1('salary')!)
      .attr('y', d => y(d.expectedSalary))
      .attr('width', x1.bandwidth())
      .attr('height', d => innerHeight - y(d.expectedSalary))
      .attr('fill', '#10b981')
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseover', function() { d3.select(this).attr('opacity', 0.8); })
      .on('mouseout', function() { d3.select(this).attr('opacity', 1); })
      .append('title')
      .text(d => `Expected Salary: $${d.expectedSalary.toLocaleString()}/yr`);

    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, 15)`);

    legend.append('rect').attr('x', 0).attr('y', 0).attr('width', 14).attr('height', 14).attr('fill', '#f43f5e').attr('rx', 2);
    legend.append('text').attr('x', 20).attr('y', 11).text('Tuition').style('font-size', '12px').style('fill', '#475569');
    legend.append('rect').attr('x', 70).attr('y', 0).attr('width', 14).attr('height', 14).attr('fill', '#10b981').attr('rx', 2);
    legend.append('text').attr('x', 90).attr('y', 11).text('Expected Salary').style('font-size', '12px').style('fill', '#475569');

  }, [chartData, width, height]);

  if (universities.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500">Select universities to see ROI comparison</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Tuition vs Expected Salary</h3>
      <svg ref={svgRef} width={width} height={height} className="mx-auto" />
    </div>
  );
}

export function BreakEvenTimeline({ universities }: { universities: University[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  const timelineData = useMemo(() => {
    return universities.map(uni => {
      const totalCost = uni.tuition * 2;
      const expectedSalary = uni.employmentRate * 50;
      const annualSavings = expectedSalary * 0.3;
      const yearsToBreakEven = annualSavings > 0 ? Math.round(totalCost / annualSavings) : 20;
      return {
        name: uni.name.length > 12 ? uni.name.substring(0, 12) + '...' : uni.name,
        fullName: uni.name,
        years: Math.max(1, Math.min(20, yearsToBreakEven)),
        tuition: uni.tuition,
        employmentRate: uni.employmentRate,
      };
    });
  }, [universities]);

  useEffect(() => {
    if (!svgRef.current || timelineData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 500;
    const height = 200;
    const margin = { top: 30, right: 30, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 20]).range([0, innerWidth]);
    const y = d3.scaleBand().domain(timelineData.map(d => d.name)).range([0, innerHeight]).padding(0.4);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(10))
      .selectAll('text')
      .style('font-size', '10px')
      .style('fill', '#64748b');

    g.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', '11px')
      .style('fill', '#64748b');

    g.selectAll('.domain, .tick line').style('stroke', '#e2e8f0');

    const colors: string[] = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e'];

    timelineData.forEach((d, i) => {
      const color = colors[i % colors.length];
      const bar = g.append('rect')
        .attr('y', y(d.name)!)
        .attr('height', y.bandwidth())
        .attr('fill', color as string)
        .attr('rx', 4)
        .style('cursor', 'pointer');

      bar.transition()
        .duration(800)
        .attr('width', x(d.years));

      bar.append('title')
        .text(`${d.fullName}: ${d.years} years to break even`);
    });

    g.selectAll('text.value')
      .data(timelineData)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', d => x(d.years) + 5)
      .attr('y', d => y(d.name)! + y.bandwidth() / 2 + 4)
      .text(d => `${d.years}yr`)
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', '#475569')
      .style('opacity', 0)
      .transition()
      .delay(800)
      .style('opacity', 1);

  }, [timelineData]);

  if (universities.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500">Select universities to see break-even timeline</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Years to Break Even</h3>
      <svg ref={svgRef} width={500} height={200} className="mx-auto" />
    </div>
  );
}

export function ComparisonCharts({ universities }: { universities: University[] }) {
  if (universities.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        Select universities to compare
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ROIChart universities={universities} />
      <BreakEvenTimeline universities={universities} />
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-sm text-amber-800">
          <strong>AI Disclaimer:</strong> ROI calculations are estimates based on average employment rates and salary data. 
          Actual outcomes may vary based on individual circumstances, market conditions, and personal factors.
        </p>
      </div>
    </div>
  );
}