# Post-Integration: Release action

This action output release tag based on JIRA Issue key.

## Inputs
|Input|Required|Description|
|---|:---:|---|
|`key`|✅|JIRA issue key|
|`token`|✅|Github Personal Access Token with permission to delete environment|

## Outputs
|Output|Description|
|------|---|
|`tag`|Release tag|

## Example usage

```yaml
- uses: actions/checkout@v2
  with:
    ref: ${{ github.event.inputs.key }}
    fetch-depth: 0
- uses: sepulsa/release-action@main
  with:
    key: ${{ github.event.inputs.key }}
    token: ${{ secrets.RELEASE_TOKEN }}
```
