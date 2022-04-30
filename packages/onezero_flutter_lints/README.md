# OneZero Flutter Lints

These are the default rules all OneZero Flutter projects should follow, however other projects are obviously also welcome to use these rules. They follow the recommended rules from the flutter_lints rules as much as possible. They might however be altered to better fit the needs of our projects.

## How to use these linting rules

#### 1. Add the `onezero_flutter_lints` package as a dev dependency

```sh
dart pub add --dev onezero_flutter_lints
```

#### 2. Create the file `analysis_options.yaml`, or open the existing one add the following include line:

```YAML
include: package:onezero_flutter_lints/flutter.yaml
```

Make sure to not include two include lines, remove the old one if needed.
