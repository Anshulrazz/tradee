"use client";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: string[];
  resources?: string[];
  pdfUrl?: string; // URL to PDF file (non-downloadable)
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Video = {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string; // YouTube or embedded video URL
};

export type SampleCourse = {
  id: string;
  title: string;
  description: string;
  level: string;
  unlockKey?: string;
  isFree?: boolean;
  modules: Module[];
  outcomes?: string[];
  videos?: Video[]; // Optional video section for the course
};

export const sampleCourseCatalog: SampleCourse[] = [
  {
    id: "binary-trading-course",
    title: "Binary Trading Course",
    description:
      "Master binary options trading step-by-step — from candlestick reading and market structure to high-probability strategies and risk management for consistent growth.",
    level: "Beginner to Advanced",
    outcomes: [
      "Understand how binary options work and how to trade responsibly.",
      "Identify candlestick patterns and market structures for high-accuracy entries.",
      "Apply proven smart money and moving average strategies.",
      "Develop discipline through effective money management and psychology."
    ],
    modules: [
      {
        id: "module-candlestick-mastery",
        title: "Candlestick Mastery",
        lessons: [
          {
            id: "lesson-intro-to-candlesticks",
            title: "Introduction to Candlestick Charts",
            duration: "10 minutes",
            summary:
              "Learn how candlestick charts display price action and what they reveal about market psychology.",
            content: [
              "Each candle shows the open, high, low, and close of a chosen time frame.",
              "A green (bullish) candle closes above its open; a red (bearish) candle closes below.",
              "Candles visualize momentum and emotion — showing who’s in control: buyers or sellers."
            ]
          },
          {
            id: "lesson-candle-anatomy",
            title: "Candle Anatomy — Body, Wick, and Shadow",
            duration: "8 minutes",
            summary:
              "Understand the structure of candlesticks and how size and shadows reflect strength or indecision.",
            content: [
              "Long bodies mean strong moves; short bodies signal indecision.",
              "Upper wicks indicate rejection from sellers; lower wicks show buyer absorption.",
              "Shadows reveal rejection levels and hidden market pressure."
            ]
          },
          {
            id: "lesson-candlestick-patterns",
            title: "Common Candlestick Patterns",
            duration: "15 minutes",
            summary:
              "Master key bullish, bearish, and indecision patterns to anticipate price reversals or continuations.",
            content: [
              "Bullish patterns: Hammer, Bullish Engulfing, Morning Star.",
              "Bearish patterns: Shooting Star, Bearish Engulfing, Evening Star.",
              "Indecision patterns: Doji, Spinning Top — signaling potential trend shifts."
            ]
          },
          {
            id: "lesson-advanced-patterns",
            title: "Advanced Candlestick Setups",
            duration: "18 minutes",
            summary:
              "Explore advanced patterns like Harami, Tweezer Tops/Bottoms, and Engulfing Bars for deeper insights.",
            content: [
              "Engulfing Bar: A reversal signal when one candle completely engulfs another.",
              "Harami: Smaller candle inside a larger one — showing a slowdown before reversal.",
              "Tweezer Tops/Bottoms: Paired candles indicating double rejection at key levels."
            ]
          }
        ]
      },
      {
        id: "module-market-structure",
        title: "Market Structure Mastery",
        lessons: [
          {
            id: "lesson-market-basics",
            title: "What is Market Structure?",
            duration: "9 minutes",
            summary:
              "Understand how price organizes into uptrends, downtrends, or ranges.",
            content: [
              "Uptrend: Higher Highs (HH) and Higher Lows (HL).",
              "Downtrend: Lower Highs (LH) and Lower Lows (LL).",
              "Range: Price moves sideways between support and resistance."
            ]
          },
          {
            id: "lesson-support-resistance",
            title: "Support and Resistance Basics",
            duration: "8 minutes",
            summary:
              "Learn to identify zones where price is likely to bounce or reverse.",
            content: [
              "Support acts as a floor — where buyers step in.",
              "Resistance acts as a ceiling — where sellers dominate.",
              "Price often respects these zones repeatedly."
            ]
          },
          {
            id: "lesson-trendlines-and-timeframes",
            title: "Trendlines and Top-Down Analysis",
            duration: "12 minutes",
            summary:
              "Use trendlines and multiple timeframes to align with the dominant trend.",
            content: [
              "Draw trendlines through swing highs/lows to visualize direction.",
              "Analyze higher timeframes (1D, 4H) for trend, and lower ones (15min, 5min) for entries.",
              "Top-down analysis ensures trading with the market, not against it."
            ]
          },
          {
            id: "lesson-bos-choch",
            title: "Break of Structure (BOS) and Change of Character (CHOCH)",
            duration: "10 minutes",
            summary:
              "Recognize market trend continuation and reversal points using structural shifts.",
            content: [
              "BOS: When price breaks the last high or low — trend continues.",
              "CHOCH: Early signal of reversal when price fails to make a new high/low.",
              "Combine BOS + CHOCH with structure mapping for precision entries."
            ]
          },
          {
            id: "lesson-order-blocks-fvg",
            title: "Order Blocks, Inducement & Fair Value Gaps (FVG)",
            duration: "14 minutes",
            summary:
              "Decode Smart Money footprints — where institutions enter and rebalance price.",
            content: [
              "Order Block: Last candle before a big move — key entry zone.",
              "Inducement: Fake breakout before true move (liquidity trap).",
              "FVG: Imbalance gap that price often revisits before continuation."
            ]
          }
        ]
      },
      {
        id: "module-trading-strategies",
        title: "High Probability Trading Strategies",
        lessons: [
          {
            id: "lesson-moving-average",
            title: "25 & 50 Moving Average Strategy",
            duration: "10 minutes",
            summary:
              "Use dual moving averages to spot trend shifts and trade direction with clarity.",
            content: [
              "Buy (CALL): 25 MA crosses above 50 MA and price above both lines.",
              "Sell (PUT): 25 MA crosses below 50 MA and price below both lines.",
              "Avoid flat markets — best used in trending conditions."
            ]
          },
          {
            id: "lesson-support-resistance-strategy",
            title: "Support & Resistance Strategy",
            duration: "8 minutes",
            summary:
              "Trade simple bounce setups at strong price zones using candle confirmations.",
            content: [
              "Buy (CALL): When price touches support and forms bullish candle.",
              "Sell (PUT): When price hits resistance and forms bearish candle.",
              "Confirm with pin bar or engulfing pattern before entry."
            ]
          },
          {
            id: "lesson-candlestick-strategy",
            title: "Candlestick Pattern Strategy",
            duration: "9 minutes",
            summary:
              "Use price action to forecast short-term reversals in binary markets.",
            content: [
              "Bullish Engulfing → Buy signal.",
              "Bearish Engulfing → Sell signal.",
              "Pin Bar → reversal confirmation pattern."
            ]
          },
          {
            id: "lesson-smc-strategy",
            title: "Smart Money Concept (SMC) Strategy",
            duration: "15 minutes",
            summary:
              "Follow institutional footprints — trade with smart money, not against it.",
            content: [
              "Identify structure (BOS, CHOCH) and liquidity zones.",
              "Wait for inducement near order blocks before entry.",
              "Enter on confirmation candle with risk control using SL and TP."
            ]
          }
        ]
      },
      {
        id: "module-money-management",
        title: "Money & Risk Management",
        lessons: [
          {
            id: "lesson-risk-rules",
            title: "Golden Rules of Money Management",
            duration: "10 minutes",
            summary:
              "Control your risk, protect your capital, and trade with consistency.",
            content: [
              "Never risk more than 1–3% of account per trade.",
              "Set daily profit/loss limits (e.g., +5% or −3%).",
              "Avoid revenge trading — stop after max loss is hit.",
              "Consistency beats aggressiveness in binary trading."
            ]
          },
          {
            id: "lesson-disclaimer",
            title: "Disclaimer & Responsible Trading",
            duration: "5 minutes",
            summary:
              "Understand the risks of binary options and trade ethically with discipline.",
            content: [
              "Binary options carry high risk; trade only with money you can afford to lose.",
              "Educational purpose only — not financial advice.",
              "No strategy guarantees 100% success — focus on practice and risk control."
            ]
          },
          {
            id: "lesson-binary-trading-course-pdf",
            title: "Binary Trading Course - Complete Guide PDF",
            duration: "View only",
            summary:
              "Comprehensive PDF guide covering all aspects of binary trading including strategies, risk management, and market analysis.",
            content: [
              "This PDF contains the complete Binary Trading Course material.",
              "You can view it in the viewer below, but downloading is disabled for content protection.",
              "Scroll through the document to access all chapters and lessons."
            ],
            pdfUrl: "/Binary Trading Course _ English .pdf"
          }
        ]
      }
    ],
    videos: [
      {
        id: "video-candlestick-basics",
        title: "Ema Strategy for Beginners",
        duration: "9 minutes",
        description: "Master the EMA (Exponential Moving Average) strategy designed for beginners. Learn how to use EMAs to identify trends and execute winning trades with confidence.",
        videoUrl: "/ema.mp4"
      },
      {
        id: "video-support-resistance",
        title: "Aligator Strategy Explained",
        duration: "3 minutes",
        description: "Discover the Alligator Strategy and how to use it to identify trend reversals and optimal entry points for profitable trades.",
        videoUrl: "/Aligator.mp4"
      },
      {
        id: "video-moving-averages",
        title: "Zig Zag strategy with RSI Filter",
        duration: "4 minutes",
        description: "Learn the Zig Zag strategy combined with RSI Filter to identify reliable support and resistance zones for high-probability trading setups.",
        videoUrl: "/Zig.mp4"
      },
      {
        id: "video-risk-management",
        title: "Bollinger Bands strategy",
        duration: "7 minutes",
        description: "Understand the Bollinger Bands strategy to trade price breakouts and reversals with precise entry and exit points.",
        videoUrl: "/Bollinger.mp4"
      }
    ]
  }
]
export const sampleCourseMap: Record<string, SampleCourse> = Object.fromEntries(
  sampleCourseCatalog.map((course) => [course.id, course]),
);

export const primaryFreeCourse =
  sampleCourseCatalog.find((course) => course.isFree && course.unlockKey) ?? sampleCourseCatalog[0];


