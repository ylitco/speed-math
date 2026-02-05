# ADR-001: Use Business Source License 1.1 for source code

**Date:** 2026-01-26

**Status:** Accepted

## Context

The Speed Math application needs to be published with source code visible for portfolio purposes (to share with potential teammates via GitHub). However, we want to prevent others from commercially competing with the app on app marketplaces.

Key requirements:

- Source code must be publicly visible for portfolio/CV purposes
- Only the author should be able to publish the app commercially
- Code should eventually become fully open source

## Decision

Use Business Source License 1.1 (BSL-1.1) with the following parameters:

- **Licensor:** Egor Litviakov
- **Change Date:** 2030-01-26
- **Change License:** MIT

## Consequences

**Positive:**

- Source code is visible to potential teammates reviewing portfolio
- Commercial use by others is restricted until Change Date
- Code automatically becomes MIT licensed in 2030
- Well-established license (created by MariaDB, used by many companies)

**Negative:**

- Not OSI-approved "open source" - code is visible but commercial use is restricted ("source available")
- Some developers may be hesitant to contribute
- Must manage versioning carefully when updating Change Date for new releases

**Notes:**
License can be updated for future versions with new Change Date
