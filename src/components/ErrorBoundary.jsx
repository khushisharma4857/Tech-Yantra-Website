import { Component } from "react";

/**
 * Catches render-time errors so one broken component degrades gracefully
 * instead of unmounting the entire app and leaving a blank white page.
 *
 * This exists because a missing import in HomePage previously took the whole
 * site down with nothing rendered and no user-visible explanation.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Kept to console only - no third-party error reporter is configured.
    if (import.meta.env.DEV) {
      console.error("Render error caught by ErrorBoundary:", error, info);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    // A silent fallback is correct for decorative subtrees (e.g. the 3D
    // background); content subtrees pass an explicit fallback instead.
    return this.props.fallback ?? null;
  }
}
