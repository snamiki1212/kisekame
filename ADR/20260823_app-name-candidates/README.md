# ADR: Application Name Candidates

- Status: Accepted
- Date: 2026-08-23

## Context

`Digicam Skin Designer` accurately describes the product, but reads as a feature
description rather than a memorable application name. We want a distinct product
name while retaining `Digicam Skin Designer` as a descriptor for search and
onboarding.

The name should be:

- short;
- easy to pronounce without explanation in both English and Japanese;
- not already used by a clearly equivalent camera-skin design service;
- searchable without competing against a common dictionary term;
- broad enough to support cameras beyond the PENTAX Optio RS1500.

## Candidate screening

This is a lightweight web collision screen performed on 2026-08-23, not a
trademark clearance or legal opinion. The purpose is to avoid an existing service
with the same name and purpose, not to eliminate every unrelated use of a word.
Trademark, domain, handle, and app-store checks can follow after a name reaches the
final shortlist.

| Candidate | Pronunciation | Idea | Collision risk | Assessment |
|---|---|---|---|---|
| **Camrobe** | CAM-rohb / カムローブ | camera + robe | Low in initial search | Best balance: short, pronounceable, visually distinctive, and describes dressing a camera |
| **Camdrobe** | CAM-drohb / カムドローブ | camera + wardrobe | Low in initial search | Very distinctive, but the consonant cluster makes spelling slightly less obvious |
| **Kamerobe** | KAM-eh-rohb / カメローブ | kamera + robe | Low in initial search | Strong Japanese pronunciation and low collision signal; English spelling is less predictable |
| **Peelcam** | PEEL-cam / ピールカム | peelable skin + camera | Low in initial search | Clear and compact, but emphasizes peeling rather than designing |
| **Kiseka** | kee-SEH-ka / キセカ | 着せ替え | Low for equivalent services | Short and friendly; an unrelated fashion label exists, which is acceptable under the relaxed criterion |
| **Qisekae** | kee-seh-KAI / キセカエ | stylized 着せ替え | Low for equivalent services | Highly distinctive spelling and direct Japanese meaning; English speakers may hesitate over the initial `Q` |
| **Kisekae** | kee-seh-KAI / キセカエ | 着せ替え | Medium | Meaning is perfect in Japanese, but the term is already strongly associated with dress-up doll software and is less searchable alone |
| **Kisekam** | KEE-seh-cam / キセカム | 着せ替え + camera | Low in initial search | Short, camera-specific, and relatively easy to say in both languages |
| **Kisekame** | KEE-seh-kah-meh / キセカメ | 着せ替え + カメラ | Low in initial search | The clearest Japanese wordplay: essentially “dress-up camera”; slightly less natural for English speakers |
| **Kisecam** | KEE-seh-cam / キセカム | 着せ替え + cam | Low in initial search | Strong candidate: `cam` is visibly recognizable, the spelling has a clear rationale, and pronunciation is relatively stable |
| **Kisecame** | KEE-seh-kah-meh / キセカメ | 着せ替え + camera | Low in initial search | Attractive in Japanese, but English readers may pronounce the ending as the word “came” |
| **Qisekam** | KEE-seh-cam / キセカム | stylized 着せ替え + camera | Low in initial search | More searchable than Kisekam, with the same initial-`Q` pronunciation tradeoff as Qisekae |
| **Skamera** | ska-MER-ah / スカメラ | skin + camera | Medium | Memorable blend, but pronunciation and spelling can vary by language |
| **Camirobe** | CAM-ee-rohb / カミローブ | camera + robe | Low | Smooth sound, but its relationship to cameras is less immediate |
| **Campeel** | CAM-peel / カムピール | camera + peel | Medium | Easy to pronounce, but sounds more like a physical peeling tool |
| **Camerobe** | CAM-er-rohb / カメラローブ | camera + robe | Low to medium | Meaning is clearest, but longer and may be pronounced several ways |
| **DigiCoat** | DIJ-ee-coat / デジコート | digital + coat | High | Existing printing/coating products and an earlier trademark filing make it unsuitable |
| **Skinora** | skin-OR-ah / スキノラ | skin + aura | High | Already used by multiple skincare applications and brands |
| **Peelora** | peel-OR-ah / ピーロラ | peel + aura | High | Already used by an art tool and consumer products |

## Current shortlist

### Japanese concept

1. **Kisekame** — current leading candidate and clearest expression of “着せ替えカメラ” for Japanese speakers.
2. **Kisecam** — strong balance of “着せ替え”, visible camera meaning, brevity, and pronunciation, but too close to “kiss cam”.
3. **Kisekam** — similar sound to Kisecam, but the `k` weakens the visible connection to camera.
4. **Qisekae** — strongest visual identity and direct connection to 着せ替え.
5. **Kiseka** — shortest and softest, despite an unrelated fashion-label use.

### Camera wardrobe concept

1. **Camrobe** — best balance of brevity, pronunciation, and meaning.
2. **Camdrobe** — stronger uniqueness at the cost of spelling ease.
3. **Kamerobe** — particularly easy to pronounce in Japanese.
4. **Peelcam** — compact functional alternative.

The product presentation would use a two-level form:

> **Kisekame**<br>
> Digicam Skin Designer

This preserves descriptive SEO terms without forcing a camera model or feature
description into the application name.

## Kisekame capitalization

`Kisekame` is the leading candidate. Capitalization should distinguish the
canonical product name from an optional visual wordmark.

| Form | Use | Assessment |
|---|---|---|
| **Kisekame** | Canonical product name | Recommended. Reads naturally as one proper noun and works well in prose, browser titles, app listings, and accessibility text |
| **KISEKAME** | Logo or display wordmark | Recommended visual variant. Strong and compact, but too forceful for ordinary prose |
| **KiseKame** | Alternative product spelling | Makes the word construction visible, but looks more like a code identifier and overemphasizes `Kame` |
| **kisekame** | Informal wordmark or handle | Friendly and contemporary, but weaker as a canonical name |
| **KiseKAME** | Stylized wordmark | Communicates two parts, but has an uneven visual rhythm and feels overly technical |
| **KiSEKAME** | Stylized wordmark | Has a Japanese game-like character, but the isolated lowercase `i` lacks a clear meaning and makes the mark feel unbalanced |
| **KiSeKaMe** | Stylized wordmark | Makes each Japanese mora visible and feels playful, but is visually noisy and difficult to type consistently |

Proposed usage:

> Logo: **KISEKAME**<br>
> Product name: **Kisekame**<br>
> Descriptor: Digicam Skin Designer

Package names, domains, URLs, and social handles should use lowercase `kisekame`
where the platform convention requires it.

## Search references

- [GitHub repository search: Camrobe](https://github.com/search?q=%22Camrobe%22&type=repositories)
- [npm package search: Camrobe](https://www.npmjs.com/search?q=Camrobe)
- [GitHub repository search: Camdrobe](https://github.com/search?q=%22Camdrobe%22&type=repositories)
- [npm package search: Camdrobe](https://www.npmjs.com/search?q=Camdrobe)
- [Kisekae Set System overview](https://en.wikipedia.org/wiki/Kisekae_Set_System)
- [Kisekae browser application](https://kisekae.org/info.html)
- [Unrelated Kiseka fashion label](https://kiseka.in/)
- [Google search: Kisecam](https://www.google.com/search?q=%22Kisecam%22)
- [Google search: Kisecame](https://www.google.com/search?q=%22Kisecame%22)
- [Skinora App Store listing](https://apps.apple.com/us/app/skinora-ai-skincare-routine/id6761994165)
- [Skinora web application](https://skinora.app/)
- [DigiCoat trademark record](https://trademarks.justia.com/873/54/digicoat-87354622.html)
- [Peelora art application](https://peelora.com/)

## Decision history

### 1. Start from an English camera-clothing metaphor

The first shortlist focused on names such as `Camrobe`, `Camdrobe`, `Kamerobe`,
and `Peelcam`. `Camrobe` became the initial recommendation because camera + robe
is reasonably understandable in English, the name is short, and no equivalent
service appeared in the initial search.

This direction was not selected because it describes the product from the outside
but does not capture the Japanese idea of **着せ替えカメラ** that motivates the
application. It is understandable, but less distinctive to the product's origin.

### 2. Explore names derived from 着せ替え

The next round added `Kiseka`, `Qisekae`, `Kisekae`, `Kisekam`, `Kisekame`, and
`Qisekam`. These names preserve the idea that a camera can change its outfit,
rather than merely being covered by a sticker.

`Kisekae` communicates the Japanese concept directly, but already has a strong
association with dress-up doll software. `Qisekae` is more visually distinctive,
but its initial `Q` makes pronunciation less predictable. `Kiseka` is short, but
loses part of the original word and needs more explanation.

### 3. Compare Kisecam and Kisekame

`Kisecam` initially became the strongest Japanese-derived candidate. Its `cam`
suffix visibly communicates camera and the complete name is compact. However, it
is too close in spelling and sound to the established phrase **kiss cam**. Case
variants such as `KISECAM` and `KiseCam` improve visual segmentation but do not
solve the spoken-name or search-association problem.

`Kisekame` retains the intended Japanese reading **キセカメ**, expresses
“着せ替えカメラ” more directly, and moves far enough away from “kiss cam”. It is
slightly longer and less immediately pronounceable for English speakers, but the
descriptor can carry the functional explanation.

### 4. Choose capitalization separately from the name

The forms `KISEKAME`, `KiseKame`, `kisekame`, `KiseKAME`, `KiSEKAME`, and
`KiSeKaMe` were considered. Mixed-case versions expose the word construction or
add playfulness, but also introduce visual noise and make the correct spelling
harder to remember. A single title-case proper noun is clearest in prose, while an
all-caps wordmark provides a strong visual identity.

## Final decision

The application name is **Kisekame**.

- Canonical product name: **Kisekame**
- Logo / display wordmark: **KISEKAME**
- Descriptor: **Digicam Skin Designer**
- Package, URL, and handle form: **kisekame**

The preferred presentation is:

> **KISEKAME**<br>
> Digicam Skin Designer

The deciding factors are:

1. It preserves the product's central Japanese concept, **着せ替えカメラ**.
2. It avoids the strong “kiss cam” association of `Kisecam`.
3. It is more ownable and memorable than the descriptive `Digicam Skin Designer`.
4. The English descriptor can explain the function without weakening the brand.
5. `Kisekame` in prose and `KISEKAME` in the logo provide a simple, consistent
   capitalization system without mixed-case spelling rules.

## Consequences

- Naming research remains visible and repeatable rather than being lost in chat.
- Product UI, page title, and metadata should migrate from `Digicam Skin Designer`
  to the **Kisekame** name while retaining the descriptor for clarity and SEO.
- Repository and package renaming can be handled separately from the visible name.
- Future logo work should use `KISEKAME`; mixed-case variants are not canonical.
