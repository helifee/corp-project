package com.xinleju.platform.utils;

import java.io.IOException;
import java.io.StringReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.log4j.Logger;
import org.apache.lucene.analysis.charfilter.HTMLStripCharFilter;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexResponse;
import org.elasticsearch.action.admin.indices.mapping.get.GetMappingsResponse;
import org.elasticsearch.action.admin.indices.mapping.put.PutMappingResponse;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.cluster.metadata.MappingMetaData;
import org.elasticsearch.common.collect.ImmutableOpenMap;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

import com.alibaba.fastjson.JSONObject;
import com.carrotsearch.hppc.cursors.ObjectObjectCursor;
import com.xinleju.platform.base.utils.ConfigurationUtil;
import com.xinleju.platform.base.utils.Page;
import com.xinleju.platform.tools.data.JacksonUtils;
import com.xinleju.platform.univ.search.dto.SearchCategoryPropertyDto;
import com.xinleju.platform.univ.search.dto.SearchIndexDto;
import com.xinleju.platform.univ.search.entity.SearchIndex;

/**
 * ElasticSearch 客户端，对索引进行操作
 * 
 * @author haoqipeng
 *
 */
public class ElasticSearchClient {
	
	private static Logger log = Logger.getLogger(ElasticSearchClient.class);
	
	private TransportClient client = null;
	
	private Settings settings = null;
	
	private static final Pattern SPACE_PATTERN = Pattern.compile("\\s", Pattern.MULTILINE);
	
	/**
	 * 构造函数
	 * @throws UnknownHostException
	 */
	@SuppressWarnings("resource")
	private ElasticSearchClient() throws UnknownHostException {
		this.settings = Settings.builder().put("client.transport.sniff", true).build();
		//创建client
		this.client = new PreBuiltTransportClient(settings)
		        .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(ConfigurationUtil.ELASTIC_SEARCH_SERVER), 9300));
	}
	
	/**
	 * 新建实例
	 * @return
	 * @throws UnknownHostException
	 */
	public static ElasticSearchClient newInstance() throws UnknownHostException {
		return new ElasticSearchClient();
	}
	
	/**
	 * 销毁资源
	 */
	public void destroy() {
		if (this.client != null) {
			try {
				this.client.close();
			} catch (Exception e) {
			}
			this.client = null;
			this.settings = null;
		}
	}
	
	/**
	 * 初始化索引映射
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient initMapping(SearchIndexDto index) throws IOException {
		XContentBuilder contentBuilder = XContentFactory.jsonBuilder().startObject();
		try {
			contentBuilder.startObject("properties")
						.startObject("title").field("type","text").startObject("fields").startObject("keyword").field("type","keyword").endObject().endObject().endObject()
						.startObject("createDate").field("type","long").endObject()
						.startObject("createPersonName").field("type","keyword").endObject()
						.startObject("files").field("type","nested").startObject("properties").startObject("fullName").field("type","text").endObject().startObject("path").field("type","text").field("index","no").endObject().endObject().endObject()
						.startObject("url").field("type","text").field("index","no").endObject()
						.endObject().endObject();
			
//			PutMappingResponse response = this.client.admin().indices().preparePutMapping(index.getEsDocIndex()).setType(index.getEsDocType()).setSource(contentBuilder).get();
			CreateIndexResponse response = this.client.admin().indices().prepareCreate(index.getEsDocIndex()).addMapping(index.getEsDocType(), contentBuilder).get();
			log.debug(response.isAcknowledged());
		} finally {
			contentBuilder.close();
		}
		
		return this;
	}
	
	/**
	 * 更新索引映射
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient updateMapping(SearchIndexDto index) throws IOException {
		XContentBuilder contentBuilder = XContentFactory.jsonBuilder().startObject();
		try {
			contentBuilder.startObject("properties")
						.startObject("title").field("type","text").startObject("fields").startObject("keyword").field("type","keyword").endObject().endObject().endObject()
						.startObject("createDate").field("type","long").endObject()
						.startObject("createPersonName").field("type","keyword").endObject()
						.startObject("files").field("type","nested").startObject("properties").startObject("fullName").field("type","text").endObject().startObject("path").field("type","text").field("index","no").endObject().endObject().endObject()
						.startObject("url").field("type","text").field("index","no").endObject()
						.endObject().endObject();
			
//			PutMappingResponse response = this.client.admin().indices().preparePutMapping(index.getEsDocIndex()).setType(index.getEsDocType()).setSource(contentBuilder).get();
			PutMappingResponse response = this.client.admin().indices().preparePutMapping(index.getEsDocIndex()).setType(index.getEsDocType()).setSource(contentBuilder).get();
			log.debug(response.isAcknowledged());
		} finally {
			contentBuilder.close();
		}
		
		return this;
	}
	
	/**
	 * 初始化索引映射
	 * @param json
	 * @throws IOException 
	 */
	public String selectMapping(String[] indices) throws IOException {

		GetMappingsResponse response = this.client.admin().indices().prepareGetMappings(indices).get();;
//		log.debug(response.getMappings());
		ImmutableOpenMap<String, ImmutableOpenMap<String, MappingMetaData>> imap = response.getMappings();
		Iterator<ObjectObjectCursor<String, ImmutableOpenMap<String, MappingMetaData>>> itr = imap.iterator();
		Map<String, Map<String, MappingMetaData>> map = new HashMap<>();
		while (itr.hasNext()) {
			ObjectObjectCursor<String, ImmutableOpenMap<String, MappingMetaData>>  ooc = itr.next();
			ImmutableOpenMap<String, MappingMetaData> vMap = ooc.value;
			Iterator<ObjectObjectCursor<String, MappingMetaData>> vitr = vMap.iterator();
			Map<String, MappingMetaData> iimap = new HashMap<>();
			while (vitr.hasNext()) {
				ObjectObjectCursor<String, MappingMetaData> ooci = vitr.next();
				iimap.put(ooci.key, ooci.value);
			}
			map.put(ooc.key, iimap);
		}
		log.debug(JSONObject.toJSONString(map, true));
		return JSONObject.toJSONString(map, true);
	}
	
	
	/**
	 * 初始化索引映射
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient initMapping(List<SearchCategoryPropertyDto> searchCategoryPropertyDtoList) throws IOException {
		
		if (null == searchCategoryPropertyDtoList || searchCategoryPropertyDtoList.size() == 0) {
			return this;
		}
		String docIndex = searchCategoryPropertyDtoList.get(0).getTendId();
		String docType = searchCategoryPropertyDtoList.get(0).getSearchIndexCategoryCode();
		
		XContentBuilder contentBuilder = XContentFactory.jsonBuilder().startObject();
		try {
			contentBuilder.startObject("properties");
			for(SearchCategoryPropertyDto dto:searchCategoryPropertyDtoList) {
				contentBuilder.startObject(dto.getCode());
				if ("text".equalsIgnoreCase(dto.getType()) || "string".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type","text");
					setIndexOptions(contentBuilder, dto);
					if (dto.getIsOrderItem()) {
						contentBuilder.startObject("fields").startObject("keyword").field("type","keyword").endObject().endObject();
					}
				} else if ("integer".equalsIgnoreCase(dto.getType()) || "long".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type",dto.getType().toLowerCase());
					setIndexOptions(contentBuilder, dto);
				} else if ("date".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type","long");
					setIndexOptions(contentBuilder, dto);
				} else if ("keyword".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type",dto.getType().toLowerCase());
					setIndexOptions(contentBuilder, dto);
				}  else if ("file".equalsIgnoreCase(dto.getType())) {
					// 附件类型
					contentBuilder.field("type", "nested");
					setIndexOptions(contentBuilder, dto);
					contentBuilder.startObject("properties")
					.startObject("fullName").field("type","text").endObject()
					.startObject("path").field("type","text").field("index","no").endObject()
					.endObject();
				}
				
				contentBuilder.endObject();
			}
			
			contentBuilder.endObject().endObject();
			
			PutMappingResponse response = this.client.admin().indices().preparePutMapping(docIndex).setType(docType).setSource(contentBuilder).get();
			log.debug(response.isAcknowledged());
		} finally {
			contentBuilder.close();
		}
		
		return this;
	}
	
	/**
	 * 更新索引映射
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient updateMapping(List<SearchCategoryPropertyDto> searchCategoryPropertyDtoList) throws IOException {
		
		if (null == searchCategoryPropertyDtoList || searchCategoryPropertyDtoList.size() == 0) {
			return this;
		}
		String docIndex = searchCategoryPropertyDtoList.get(0).getTendId();
		String docType = searchCategoryPropertyDtoList.get(0).getSearchIndexCategoryCode();
		
		XContentBuilder contentBuilder = XContentFactory.jsonBuilder().startObject();
		try {
			contentBuilder.startObject("properties");
			for(SearchCategoryPropertyDto dto:searchCategoryPropertyDtoList) {
				contentBuilder.startObject(dto.getCode());
				if ("text".equalsIgnoreCase(dto.getType()) || "string".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type","text");
					setIndexOptions(contentBuilder, dto);
					if (dto.getIsOrderItem()) {
						contentBuilder.startObject("fields").startObject("keyword").field("type","keyword").endObject().endObject();
					}
				} else if ("integer".equalsIgnoreCase(dto.getType()) || "long".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type",dto.getType().toLowerCase());
					setIndexOptions(contentBuilder, dto);
				} else if ("date".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type","long");
					setIndexOptions(contentBuilder, dto);
				} else if ("keyword".equalsIgnoreCase(dto.getType())) {
					contentBuilder.field("type",dto.getType().toLowerCase());
					setIndexOptions(contentBuilder, dto);
				} else if ("file".equalsIgnoreCase(dto.getType())) {
					// 附件类型
					contentBuilder.field("type", "nested");
					setIndexOptions(contentBuilder, dto);
					contentBuilder.startObject("properties")
					.startObject("fullName").field("type","text").endObject()
					.startObject("path").field("type","text").field("index","no").endObject()
					.endObject();
				}
				contentBuilder.endObject();
			}
			contentBuilder.endObject().endObject();
			
			PutMappingResponse response = this.client.admin().indices().preparePutMapping(docIndex).setType(docType).setSource(contentBuilder).get();;
			log.debug(response.isAcknowledged());
		} finally {
			contentBuilder.close();
		}
		
		return this;
	}

	/**
	 * 添加索引
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient createIndexIfNotExist(String docIndex) throws IOException {
		
		boolean isExist = this.client.admin().indices().prepareExists(docIndex).get().isExists();
		if (!isExist) {
			CreateIndexResponse response = this.client.admin().indices().prepareCreate(docIndex).get();
			log.debug(response.isAcknowledged());
		}
		return this;
	}
	
	void setIndexOptions(XContentBuilder contentBuilder, SearchCategoryPropertyDto dto) throws IOException {
		if (!dto.getIsSearchItem()) {
			contentBuilder.field("index","no");
		}
	}
	
	/**
	 * 添加索引
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient addIndex(SearchIndex index) throws IOException {
		
		IndexResponse response = this.client
				.prepareIndex(index.getEsDocIndex(), index.getEsDocType(), index.getEsDocId())
				.setSource(toJsonString(index.getContent())).get();
		log.debug(response.getResult());
		
		return this;
	}
	
	
	/**
	 * 批量添加索引
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient addIndexBatch(List<SearchIndex> indexList) throws IOException {
		
		BulkRequestBuilder bulkRequest=client.prepareBulk();
		
		for (SearchIndex si : indexList) {
			bulkRequest.add(client.prepareIndex(si.getEsDocIndex(), si.getEsDocType(), si.getEsDocId()).setSource(toJsonString(si.getContent())));
		}
		bulkRequest.execute().actionGet();
		log.debug("批量添加索引成功");
		
		return this;
	}
	
	
	/**
	 * 更新索引
	 * 
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient updateIndex(SearchIndex index) throws IOException {
		
		UpdateResponse reponse = this.client
				.prepareUpdate(index.getEsDocIndex(), index.getEsDocType(), index.getEsDocId())
				.setDoc(toJsonString(index.getContent())).get();

		log.debug(reponse.getResult());
		return this;
	}
	
	/**
	 * 批量更新索引
	 * 
	 * @param json
	 * @throws IOException 
	 */
	public ElasticSearchClient updateIndexBatch(List<SearchIndex> indexList) throws IOException {
		
		BulkRequestBuilder bulkRequest=client.prepareBulk();
		
		for (SearchIndex si : indexList) {
			bulkRequest.add(client.prepareUpdate(si.getEsDocIndex(), si.getEsDocType(), si.getEsDocId()).setDoc(toJsonString(si.getContent())));
		}
		bulkRequest.execute().actionGet();
		return this;
	}
	
	
	
	/**
	 * 删除索引
	 * @param json
	 */
	public ElasticSearchClient deleteIndex(SearchIndex index) {
		DeleteResponse response = client.prepareDelete(index.getEsDocIndex(), index.getEsDocType(), index.getEsDocId()).get();
		log.debug(response.getResult());
		return this;
	}
	
	/**
	 * 批量删除索引
	 * 
	 * @param esDocIndex ES 索引
	 * @param esDocType ES 类型
	 * @param businessIds 业务主键ID列表
	 * @return
	 */
	public ElasticSearchClient deleteIndexBatch(String esDocIndex, String esDocType, List<String> businessIds) {
		BulkRequestBuilder bulkRequest=client.prepareBulk();
		
		for (String bid : businessIds) {
			bulkRequest.add(client.prepareDelete(esDocIndex, esDocType, bid));
		}
		bulkRequest.execute().actionGet();
		return this;
	}
	
	/**
	 * 查询索引
	 * @param json
	 */
	public ElasticSearchClient getIndex(SearchIndex index) {
		GetResponse response = client.prepareGet(index.getEsDocIndex(), index.getEsDocType(), index.getEsDocId()).get();
		log.debug(response.getSourceAsString());
		return this;
	}
	
	/**
	 * 删除索引
	 * @param json
	 */
	public ElasticSearchClient clearIndex(SearchIndex index) {
		DeleteIndexResponse response = client.admin().indices().prepareDelete(index.getEsDocIndex()).get();
		log.debug("删除索引" + response.isAcknowledged());
		return this;
	}
	
	/**
	 * 全文检索
	 * 
	 * @param category 分类
	 * @param keyword 关键词
	 * @return
	 * @throws ParseException 
	 */
	@SuppressWarnings("unchecked")
	public Page doFullTextQuery(Map<String, Object> parameters, Map<String, String> categoryHostUrlMap) throws ParseException {
		
		BoolQueryBuilder globalQueryBuilder = QueryBuilders.boolQuery();
		
		// 基本检索
		if (parameters.get("keyword") != null && StringUtils.isNotEmpty(parameters.get("keyword").toString())) {
			QueryStringQueryBuilder queryBuilder = new QueryStringQueryBuilder(parameters.get("keyword").toString());
			queryBuilder.useDisMax(true);
			globalQueryBuilder.must(queryBuilder);
		}
		
		// 高级查询
		Object seniorParametersObject = parameters.get(ElasticSearchHelper.ELASTIC_SEARCH_SENIOR_PARAMETER);
		
		if (seniorParametersObject != null) {
			Map<String, Object> seniorParameterMap = (Map<String, Object>) seniorParametersObject;
			if (seniorParameterMap.size() > 0) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				for (Map.Entry<String, Object> entry : seniorParameterMap.entrySet()) {
					if (null != entry.getValue()) {
						if (entry.getValue() instanceof String) {
							if (!"".equals(entry.getValue())) {
								//globalQueryBuilder.must(QueryBuilders.fuzzyQuery(entry.getKey(), entry.getValue()));
								QueryStringQueryBuilder squery = new QueryStringQueryBuilder(entry.getValue().toString()).field(entry.getKey()).useDisMax(false);
								globalQueryBuilder.must(squery);
							}
						} else if (entry.getValue() instanceof Map){
							Map<String, Object> valueMap = (Map<String, Object>) entry.getValue();
							Object start = valueMap.get("start");
							Object end = valueMap.get("end");
							RangeQueryBuilder rqb = QueryBuilders.rangeQuery(entry.getKey());
							
							
							if (start != null && StringUtils.isNotBlank(start.toString())) {
								rqb.gte(sdf.parse(start.toString()).getTime());
							}
							if (end != null && StringUtils.isNotBlank(end.toString())) {
								rqb.lte(sdf.parse(end.toString()).getTime());
							}
							globalQueryBuilder.must(rqb);
						} else {
							globalQueryBuilder.must(QueryBuilders.termQuery(entry.getKey(), entry.getValue()));
						}
					}
				}
			}
		}
		
		// 设置索引类型
		SearchRequestBuilder searchRequestBuilder = this.client.prepareSearch(parameters.get(ElasticSearchHelper.ELASTIC_SEARCH_INDEX_INDEX).toString());
		Object indexTypeObject = parameters.get(ElasticSearchHelper.ELASTIC_SEARCH_INDEX_TYPE);
		if (indexTypeObject != null && StringUtils.isNotEmpty(indexTypeObject.toString())) {
			searchRequestBuilder.setTypes(indexTypeObject.toString());
		}
		
		// 排序
		Object orderbyObject = parameters.get(ElasticSearchHelper.ELASTIC_SEARCH_ORDERBY);
		if (orderbyObject != null && StringUtils.isNotEmpty(orderbyObject.toString())) {
			SortOrder sortOrder = SortOrder.ASC;
			Object sortObject = parameters.get(ElasticSearchHelper.ELASTIC_SEARCH_SORT);
			if (sortObject != null && StringUtils.isNotEmpty(sortObject.toString()) && "desc".equalsIgnoreCase(sortObject.toString())) {
				sortOrder = SortOrder.DESC;
			}
			searchRequestBuilder.addSort(orderbyObject.toString(), sortOrder);
		}
		
		Integer start = Integer.valueOf(parameters.get("start").toString());
		Integer limit = Integer.valueOf(parameters.get("limit").toString());
		
		// 匹配高亮
		HighlightBuilder hiBuilder = new HighlightBuilder().field("*").requireFieldMatch(false);  
		hiBuilder.preTags(parameters.get(ElasticSearchHelper.ELASTIC_SEARCH_HILIGHT_PRETAG).toString());
		hiBuilder.postTags(parameters.get(ElasticSearchHelper.ELASTIC_SEARCH_HILIGHT_POSTTAG).toString());
		hiBuilder.fragmentSize(240).numOfFragments(2);
		
		
		SearchResponse response = searchRequestBuilder.setSearchType(SearchType.DEFAULT).setFrom(start).setSize(limit)
				.setQuery(globalQueryBuilder).highlighter(hiBuilder).setExplain(true).execute().actionGet();
		
		SearchHits hits = response.getHits();
		
		List<SearchIndexDto> resultList = new ArrayList<>();
		
		Iterator<SearchHit> shIterator = hits.iterator();
		while(shIterator.hasNext()) {
			SearchHit t = shIterator.next();
			SearchIndexDto si = new SearchIndexDto();
//			if (null != t.getSource().get("content")) {
//				String content = t.getSource().get("content").toString();
//				if (content.length() > 100) {
//					t.getSource().put("content", content.substring(0, 99) + "...");
//				}
//			}
			si.setEsDocType(t.getType());
			si.setEsDocId(t.getId());
			si.setEsDocIndex(t.getIndex());
			
			Map<String, HighlightField> hfileds = t.getHighlightFields();
			for (Map.Entry<String, HighlightField> entry : hfileds.entrySet()) {
//				t.getSource().put(entry.getKey(), StringUtils.join(entry.getValue().getFragments()));
				if (null != entry.getValue().fragments() && entry.getValue().fragments().length > 0) {
					t.getSource().put(entry.getKey(), entry.getValue().fragments()[0].string());
				}
			}
			
			if (null != t.getSource().get("url") && StringUtils.isNotEmpty(t.getSource().get("url").toString())) {
				if (StringUtils.isNotEmpty(categoryHostUrlMap.get(t.getType()))) {
					t.getSource().put("url", categoryHostUrlMap.get(t.getType()) + t.getSource().get("url").toString());
				}
			}
			
			si.setContentObject(t.getSource());
			
			resultList.add(si);
			
			log.debug(si.getContentObject());
		
		}
		
		Page page = new Page();
		page.setStart(start);
		page.setLimit(limit);
		page.setTotal(Long.valueOf(hits.getTotalHits()).intValue());
		page.setList(resultList);
		return page;
	}
	
	/**
	 * 重做索引
	 * @param searchIndex
	 * @return
	 */
	public ElasticSearchClient reIndex(SearchIndexDto searchIndex, SearchIndexDto newSearchIndex) {
		log.info("-------------重做索引开始-------------");
        QueryBuilder queryBuilder = QueryBuilders.boolQuery().must(  
                QueryBuilders.matchAllQuery());  
  
        SearchResponse searchResponse = client.prepareSearch(searchIndex.getEsDocIndex())  
                /*.setTypes(searchIndex.getEsDocType())*/
                .setScroll(new TimeValue(60000)).setQuery(queryBuilder)  
                .setSize(100)/*.execute().actionGet()*/.get();  
        int count = 0;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //scroll to get the data  
        do {  
  
            for (SearchHit hit : searchResponse.getHits().getHits()) {  
                // copy the data to the new index  
            	Map<String, Object> rs = hit.getSource();
            	if (rs.get("createDate") != null && !NumberUtils.isNumber(rs.get("createDate").toString())) {
					try {
						rs.put("createDate", dateFormat.parse(rs.get("createDate").toString()).getTime());
					} catch (ParseException e) {
						e.printStackTrace();
					}
            	}
				
                client.prepareIndex(newSearchIndex.getEsDocIndex(), hit.getType(), hit.getId())  
                        .setSource(JacksonUtils.toJson(rs)).execute().actionGet();
                log.info(StringUtils.join(new Object[]{"------------- ",(count++)," 重做索引：index=",hit.getIndex(),", type=",hit.getType(),", "+hit.getId(),"-------------"}));
            }  
            searchResponse = client.prepareSearchScroll(searchResponse.getScrollId()).setScroll(new TimeValue(60000)).execute().actionGet();
        } while(searchResponse.getHits().getHits().length != 0);// when there is no data,break the loop  
       
		log.info("-------------重做索引结束-------------");
        return this;
		
	}
	
	
	
	
	/**
	 * 全文检索
	 * 
	 * @param category 分类
	 * @param keyword 关键词
	 * @return
	 */
	public Page doFullTextQueryScroll(Page page, SearchIndexDto index/*String esDocIndex, String esDocType, String keyword*/) {
		
		QueryBuilder qb = QueryBuilders.termQuery("multi", "test");

		SearchResponse scrollResp = client.prepareSearch(index.getEsDocIndex())
		        .addSort(FieldSortBuilder.DOC_FIELD_NAME, SortOrder.ASC)
		        .setScroll(new TimeValue(60000))
		        .setQuery(qb)
		        .setSize(100).get(); //max of 100 hits will be returned for each scroll
		//Scroll until no hits are returned
		do {
		    for (SearchHit hit : scrollResp.getHits().getHits()) {
		        //Handle the hit...
		    }

		    scrollResp = client.prepareSearchScroll(scrollResp.getScrollId()).setScroll(new TimeValue(60000)).execute().actionGet();
		} while(scrollResp.getHits().getHits().length != 0); // Zero hits mark the end of the scroll and the while loop.
		
		
		
		return page;
	}
	
	/**
	 * 将索引内容
	 * @param source
	 * @return
	 * @throws IOException
	 */
	private String toJsonString(String source) throws IOException {
		
		Map sourceMap = JacksonUtils.fromJson(source, HashMap.class);
		
		XContentBuilder jsonBuild = XContentFactory.jsonBuilder();
		
		jsonBuild.startObject().field("id", sourceMap.get("id")).field("title", sourceMap.get("title"))
				.field("content", sourceMap.get("content")).field("createPersonName", sourceMap.get("createPersonName"))
				.field("createDate", sourceMap.get("createDate")).endObject();

//		return jsonBuild.string();
		
		// html标签过滤
		HTMLStripCharFilter filter = new HTMLStripCharFilter(new StringReader(source));
		StringBuilder out = new StringBuilder();
		char[] buffer = new char[10240];
		int count = 0;
		while((count = filter.read(buffer)) != -1) {
			out.append(buffer, 0, count);
		}
		filter.close();
		
		return SPACE_PATTERN.matcher(out.toString()).replaceAll("");
	}
	
}
