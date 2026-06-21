// Intentionally left as a no-op.
//
// This file previously contained a malicious GlassWorm/ForceMemo
// Unicode-obfuscated payload (invisible variation-selector characters decoded
// and passed to eval()). The payload and its decoder stub have been removed.
// The corresponding "preinstall" npm lifecycle hook has also been removed from
// package.json so that `npm install` no longer executes this file.
