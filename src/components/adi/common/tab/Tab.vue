<template>
<div class="tab">
	<!-- 文字新闻区 -->
	<div class="tab-page">
		<!-- 头部标题 -->
		<div class="tab-header-title">
			<div class="tab-news-option">
				<a href="">最新</a>
			</div>
			<div class="tab-news-option tab-news-connected">
				<a href="">新闻</a>
			</div>
			<div class="tab-news-option tab-news-connected">
				<a href="">公告</a>
			</div>
			<div class="tab-news-option tab-news-connected">
				<a href="">攻略</a>
			</div>
			<div class="tab-news-option tab-news-connected">
				<a href="">视频</a>
			</div>
			<a href="">
				<div class="tab-symbol"></div>
			</a>
		</div>

		<!-- 告示 -->
		<div class="tab-notice">
			<a href="">
					2018年3月20日维护公告
			</a>
		</div>
		<!-- 文章标题 -->
		<div class="tab-article-title">
			<div>
					<a href="">
						<div>[新闻]</div>
						<div>2018年3月20日维护公告</div>
						<div class="tab-news-release-time">03/20</div>
					</a>
			</div>
			<div>
					<a href="">
						<div>[新闻]</div>
						<div>2018年3月20日维护公告</div>
						<div class="tab-news-release-time">03/20</div>
					</a>
			</div>
			<div>
					<a href="">
						<div>[新闻]</div>
						<div>2018年3月20日维护公告</div>
						<div class="tab-news-release-time">03/20</div>
					</a>
			</div>
			<div>
					<a href="">
						<div>[新闻]</div>
						<div>2018年3月20日维护公告</div>
						<div class="tab-news-release-time">03/20</div>
					</a>
			</div>
			<div>
					<a href="">
						<div>[新闻]</div>
						<div>2018年3月20日维护公告</div>
						<div class="tab-news-release-time">03/20</div>
					</a>
			</div>
		</div>
	</div>

	<!-- 图片区 -->
	<div class="tab-image"></div>
</div>
</template>

<script>
import compBaseMixin from '../comp.base.mixin'

export default {
  name: 'AdiTab',
  mixins: [compBaseMixin],
  methods: {},
  computed: {}
}
</script>

<style lang="scss">
	.tab {
		height: 300px;
		padding: 20px;
		min-width: 626px;
		max-width: 700px;
		margin: 0 auto;
		border: #bbbaba 1px solid;
		border-radius: 5px; 
		.tab-page {
			float: left;
			a {
				text-decoration: none;
			}

			/* 头部标题 */
			.tab-header-title {
				a {
					.tab-symbol {
						background-image: url(https://user-images.githubusercontent.com/29323249/40828999-cd9a0fca-65b4-11e8-998f-ca95940cf843.png);
						background-repeat: no-repeat;
						background-position-x: 40px;
						background-size: 20px;
						height: 35px;
						width: 35px;
						float: right;
						padding-left: 25px;
						border-bottom: #e3e3e3 2px solid;
					}
					div {
						display: inline-block;
					}
				}
				.tab-news-option {
					display: inline-block;
					height: 35px;
					padding-right: 35px;
					border-bottom: #e3e3e3 2px solid;
					a {
						color: black;
						font-size: 16px;
					}
				}
				.tab-news-option:hover {
					border-bottom: red 2px solid;
				}
				.tab-news-connected {
					margin-left: -10px;
					padding-left: 10px;
				}
			}

			/* 中间公告 */
			.tab-notice {
				height: 40px;
				padding-top: 10px;
				padding-bottom: 10px;
				a {
					color: red;
					font-weight: bold;
				}
			}

			/* 下方标题以及内容 */
			.tab-article-title {
				div {
					display: block;
					height: 20px;
					margin-bottom: 15px;
					a {
						color: black;
						font-size: 14px;
						div {
							display: inline-block;
							float: left;
						}
						.tab-news-release-time {
							float: right;
							background-color: #6f6f6f;
							color: #fff;
						}
					}
				}
			}
		}
		.tab-image {
			display: inline-block;
			float: right;
			width: 172px;
			height: 262.5px;
			background-image: url(https://user-images.githubusercontent.com/29323249/40828974-b84740ac-65b4-11e8-8bb4-f92727e12544.png);
			background-size: 100%;
		}
	}
</style>

