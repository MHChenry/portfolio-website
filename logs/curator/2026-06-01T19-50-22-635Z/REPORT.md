# Curator Run Report

- Mode: dry-run
- Started: 2026-06-01T19:50:22.635Z
- Finished: 2026-06-01T19:50:40.088Z
- Duration seconds: 17.453
- Model: qwen3.5-plus
- Provider: TomatoClaw

## 自动转换计数

- checked: 0
- marked_stale: 0
- archived: 0
- reactivated: 0

## Consolidations

```json
[]
```

## Prunings

```json
[]
```

## 新 umbrella skill

```json
[]
```

## 状态迁移

```json
[]
```

## 完整 LLM 输出

{"type":"thinking","thinking":"根据 list 结果，当前共有 4 个 skill：\n\n1. frontend-design-fusion - created_by: human\n2. git-essentials - created_by: human\n3. vercel-deploy - created_by: human\n4. winapp-cli - created_by: human\n\n所有 4 个 skill 的 created_by 都是 \"human\"，根据硬规则 1：\n> 只允许操作 created_by=agent 的 skill；human/bundled/hub 一律只读。\n\n这意味着所有当前 skill 都不可操作，只能跳过。\n\n另外，候选列表为空 `[]`，也说明本轮没有需要处理的 agent-created skill。\n\n结论：本轮没有可合并的 skill，全部跳过。","thinkingSignature":"reasoning_content"}
# Curator Review — Umbrella Consolidation (DRY-RUN) 最终摘要

## 分析结果

当前工作区共有 **4 个 skill**，全部为 `created_by=human`：

| Skill 名称 | created_by | pinned | 状态 |
|-----------|------------|--------|------|
| frontend-design-fusion | human | false | 只读跳过 |
| git-essentials | human | false | 只读跳过 |
| vercel-deploy | human | false | 只读跳过 |
| winapp-cli | human | false | 只读跳过 |

## 治理决策

根据硬规则 #1：**只允许操作 created_by=agent 的 skill；human/bundled/hub 一律只读。**

| 分类 | 数量 | Skill 列表 | 原因 |
|------|------|-----------|------|
| **Consolidated** | 0 | — | 无 agent-created skill 可合并 |
| **Pruned** | 0 | — | 无 agent-created skill 可修剪 |
| **Skipped** | 4 | frontend-design-fusion, git-essentials, vercel-deploy, winapp-cli | 全部为 human 创建，按规则只读 |

## 结论

本轮 **无操作**。候选列表为空，且现有 skill 均为 human 创建，不符合 umbrella consolidation 的操作范围。

如需进行 skill 治理，需等待 agent 自动创建的 skill 积累后，再执行下一轮审查。

## 恢复指引

- 单个 skill：调用 settings.curator restoreSkill action，从 skills-self/.archive/{skillName}/ 恢复。
- 整体回滚：手动解压本次真实运行前的 skills-self/.curator_backups/{timestamp}/skills.tar.gz。
- 若要暂停治理：将 curator.enabled 设为 false。

## Notes

- dry-run: snapshot/state/.curator_state skipped
