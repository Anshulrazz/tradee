"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, Target, BarChart3, Zap } from "lucide-react"
import {
  createChart,
  CrosshairMode,
  IChartApi,
  CandlestickData,
  DeepPartial,
  ChartOptions,
  Time,
} from "lightweight-charts"

function CountUpStat({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isVisible, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function PerformanceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const chartContainer = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)

  const stats = [
    { icon: TrendingUp, label: "Portfolio Growth", value: 245, suffix: "%", period: "Last 2 Years", color: "from-green-500/20 to-emerald-500/20" },
    { icon: Target, label: "Winning Trades", value: 89, suffix: "%", period: "Success Rate", color: "from-blue-500/20 to-cyan-500/20" },
    { icon: BarChart3, label: "Students Profitable", value: 8500, suffix: "+", period: "And Growing", color: "from-purple-500/20 to-pink-500/20" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!chartContainer.current) return

    const container = chartContainer.current
    const gridColor = 'rgba(200, 161, 93, 0.1)'

    const chartOptions: DeepPartial<ChartOptions> = {
      width: container.clientWidth,
      height: 320,
      layout: {
        background: { color: 'transparent' },
        textColor: '#f5f5f5',
        fontSize: 12,
      },
      grid: { 
        vertLines: { color: gridColor, visible: true }, 
        horzLines: { color: gridColor, visible: true } 
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { visible: true, borderVisible: false },
      timeScale: { rightOffset: 5, barSpacing: 8, borderVisible: false },
    }

    const chart = createChart(container, chartOptions)
    chartRef.current = chart

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    })

    const nowSec = Math.floor(Date.now() / 1000)
    const initial: CandlestickData[] = Array.from({ length: 60 }).map((_, i) => {
      const t = nowSec - (60 - i) * 60
      const base = 100 + Math.sin(i / 6) * 6 + Math.random() * 4
      const open = +(base + (Math.random() - 0.5) * 2).toFixed(2)
      const close = +(open + (Math.random() - 0.5) * 3).toFixed(2)
      const high = Math.max(open, close) + +(Math.random() * 2).toFixed(2)
      const low = Math.min(open, close) - +(Math.random() * 2).toFixed(2)
      return { time: t as Time, open, high, low, close }
    })

    candleSeries.setData(initial)

    const ro = new ResizeObserver(() => {
      if (chart && container) chart.applyOptions({ width: container.clientWidth })
    })
    ro.observe(container)

    let lastTime = initial[initial.length - 1].time as number
    const iv = setInterval(() => {
      lastTime = lastTime + 60
      const prevClose = initial.length ? initial[initial.length - 1].close : 110
      const open = prevClose
      const close = +(open + (Math.random() - 0.5) * 4).toFixed(2)
      const high = Math.max(open, close) + +(Math.random() * 2).toFixed(2)
      const low = Math.min(open, close) - +(Math.random() * 2).toFixed(2)
      const next: CandlestickData = { time: lastTime as Time, open, high, low, close }
      candleSeries.update(next)
      initial.push(next)
      if (initial.length > 500) initial.shift()
    }, 2000)

    return () => {
      clearInterval(iv)
      ro.disconnect()
      if (chart) chart.remove()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4" />
            Proven Results
          </span>
          <h2 className="font-nav text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            My Trading <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Consistent growth and student success backed by real numbers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card
                key={idx}
                className={`glass-card rounded-2xl p-6 lg:p-8 text-center hover-lift border-border/50 hover:border-primary/50 transition-all duration-500 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-foreground w-8 h-8" />
                </div>
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
                  {stat.suffix === "+" ? "" : "+"}
                  <CountUpStat end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-muted-foreground">{stat.period}</p>
              </Card>
            )
          })}
        </div>

        <Card className={`glass-card rounded-2xl p-4 lg:p-6 border-border/50 ${isVisible ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Live Market Feed</h3>
              <p className="text-xs text-muted-foreground">Real-time trading simulation</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
          <div ref={chartContainer} className="w-full h-[280px] md:h-[320px] rounded-xl overflow-hidden" />
        </Card>
      </div>
    </section>
  )
}
